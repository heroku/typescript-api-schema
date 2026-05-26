# Support for `patternProperties` in hyperschema link bodies

## Problem

The Heroku Platform hyperschema occasionally describes a request body using
JSON Schema's `patternProperties` keyword instead of (or in addition to)
`properties`. The hyperschema normalizer (`src/gen/normalize-hyperschema.ts`)
currently only recognizes link bodies that have `properties`, so links whose
`schema` uses `patternProperties` are silently dropped from generation:

- No `…Opts` aux type is emitted.
- The generated `HerokuClient` method has no `requestBody` parameter.
- The route registry omits `hasRequestBody: true`.

In the current 3.sdk hyperschema, two links are affected:

| Resource              | Link title | Pattern               | Value type        |
|-----------------------|------------|-----------------------|-------------------|
| `config-var`          | Update     | `^\w+$`               | `string \| null`  |
| `pipeline-config-var` | Update     | `^[\w\.\:\[\]]+$`     | `string \| null`  |

Resource-level `patternProperties` (e.g. `config-var` itself) is already
handled correctly — it flows through `buildResourceShape`'s `alias` branch
and `primitiveTypeToTypeRef`, producing
`export type ConfigVar = Record<string, string>`. The gap is exclusive to
**link-level** `schema` processing.

## Goals

- Generated types in `dist/3.sdk/types.d.ts` describe a request body for
  every link whose `schema` uses `patternProperties`.
- The route registry `dist/3.sdk/routes.js` records `hasRequestBody: true`
  for those routes.
- Existing behavior for links with `properties`, `$ref`-shaped link
  schemas, and resource-level shapes is preserved bit-for-bit.

## Non-goals

- Supporting links whose `schema` mixes `properties` and `patternProperties`
  in the same node. The current hyperschema has no such case; if one
  appears later, an explicit follow-up can model it as an intersection.
- Changes to resource-level `patternProperties` handling. Already correct.
- New runtime validation of pattern keys. Generation only.

## Approach

Wire the existing intermediate-model machinery (the `record` `TypeRef`
kind and the `alias` `AuxType` kind) through the link-schema code path.
The fix is centralized at the predicate that gates link-level request
body emission.

### Changes to `src/gen/normalize-hyperschema.ts`

1. Add two helpers that resolve `$ref` chains before inspecting the node:

   ```ts
   private hasPatternProperties(node: SchemaNode | undefined): boolean
   private hasRequestBodySchema(node: SchemaNode | undefined): boolean
   ```

   `hasRequestBodySchema` is true when either
   `hasCustomProperties(node)` or `hasPatternProperties(node)` is true.

2. In `buildAuxTypes`, when `hasPatternProperties(link.schema)` is true
   and `hasCustomProperties(link.schema)` is false, push an `alias`
   aux type:

   ```ts
   {
     kind: 'alias',
     name: <Resource><Title>Opts,
     description: link.description,
     type: this.schemaToTypeRef(resolvedSchema),
   }
   ```

   `resolvedSchema` is the result of `resolveSchemaNode(link.schema)`.
   Because the resolved node has `type: ['object']` and
   `patternProperties`, `schemaToTypeRef` → `primitiveTypeToTypeRef`
   produces `{ kind: 'record', valueType }`, which the emitter renders
   as `Record<string, V>`.

3. In `buildMethods`, change the gating condition for the `requestBody`
   parameter from `hasCustomProperties(link.schema)` to
   `hasRequestBodySchema(link.schema)`. The parameter type stays a
   reference to `<Resource><Title>Opts` — that name now points at the
   alias rather than an interface, but the reference is identical.

4. In `routeEntries`, change the condition that sets
   `entry.hasRequestBody = true` from `hasCustomProperties` to
   `hasRequestBodySchema`.

### Mixed-properties case

If a future link.schema has both `properties` and `patternProperties`,
the current `hasCustomProperties` predicate wins and the alias branch is
skipped — `patternProperties` is ignored as it is today. That preserves
current output exactly and keeps this change minimally scoped. A
follow-up can model it as an intersection when a real instance shows up.

### No emitter changes

`ts-emit.ts` already renders `record` types as `Record<string, V>` and
already handles alias-kind aux types via `emitAuxType`. No new output
style decisions are needed.

## Expected generated output

New aux types added to `dist/3.sdk/types.d.ts`:

```ts
/** hash of config changes – update values or delete by seting it to `null` */
export type ConfigVarUpdateOpts = Record<string, string | null>

/** hash of config changes – update values or delete by seting it to `null` */
export type PipelineConfigVarUpdateOpts = Record<string, string | null>
```

Updated `HerokuClient` methods:

```ts
configVar: {
  update(appIdentity: string, requestBody: ConfigVarUpdateOpts): Promise<ConfigVar>
}
pipelineConfigVar: {
  update(
    pipelineId: string,
    pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production',
    requestBody: PipelineConfigVarUpdateOpts,
  ): Promise<PipelineConfigVar>
}
```

Route registry additions in `dist/3.sdk/routes.js`:

```js
configVar.update      // gains "hasRequestBody": true
pipelineConfigVar.update // gains "hasRequestBody": true
```

## Tests

Add to `src/gen/normalize-hyperschema.test.ts`, mirroring the existing
`$ref link.schema` describe block:

1. **pure `patternProperties` link.schema**
   - Emits `export type <…>Opts = Record<string, string | null>`.
   - `HerokuClient` method has `requestBody: <…>Opts`.
   - `routes.js` entry has `"hasRequestBody": true`.

2. **multiple patterns** (no real-world case, but covers the rule)
   - Confirms first pattern's value type is used (matches existing
     `primitiveTypeToTypeRef` behavior).

3. **regression: `properties`-only link.schema is unchanged**
   - Existing `$ref` test suite already covers this; add one direct
     `properties`-only assertion to lock the behavior.

The full `dist/3.sdk` output is regenerated and checked into the PR
so the diff is auditable.

## Risk and rollback

Risk is low: the change adds two helpers and broadens one predicate at
three call sites. No existing branch is modified — `properties` and
`$ref` paths are evaluated first. If the alias branch misbehaves for
some unexpected schema shape, removing the `||
hasPatternProperties(...)` term in `hasRequestBodySchema` and the new
alias push in `buildAuxTypes` reverts to current behavior.
