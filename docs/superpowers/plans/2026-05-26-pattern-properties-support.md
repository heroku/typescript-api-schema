# patternProperties Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate request body types and route metadata for hyperschema links whose `schema` uses `patternProperties` instead of `properties`.

**Architecture:** Extend `HyperschemaNormalizer` in `src/gen/normalize-hyperschema.ts` with a `hasPatternProperties` predicate and a combined `hasRequestBodySchema` predicate; wire it into `buildAuxTypes` (emitting an `alias` AuxType backed by `schemaToTypeRef`'s existing `record` output), `buildMethods` (gating the `requestBody` parameter), and `routeEntries` (gating `hasRequestBody`). Spec: `docs/superpowers/specs/2026-05-26-pattern-properties-support-design.md`.

**Tech Stack:** TypeScript (strict, esnext), Vitest, executed via `tsx`. No build step for generator source.

---

## File Structure

- **Modify:** `src/gen/normalize-hyperschema.ts` — add two predicates, push alias aux type, broaden gating in `buildMethods` and `routeEntries`.
- **Modify:** `src/gen/normalize-hyperschema.test.ts` — add a `describe` block covering link-level `patternProperties`.
- **Regenerate (artifact):** `dist/3.sdk/types.d.ts` and `dist/3.sdk/routes.js` via `npm run generate`.

No new files. The emitter (`src/gen/ts-emit.ts`) already handles `record` `TypeRef` and `alias` `AuxType` — no changes there.

---

## Task 1: Add a failing test for pure `patternProperties` link.schema

**Files:**
- Test: `src/gen/normalize-hyperschema.test.ts`

- [ ] **Step 1: Append a new describe block to the existing test file**

Append to the end of `src/gen/normalize-hyperschema.test.ts`:

```typescript
describe('normalizeHyperschema with patternProperties link schemas', () => {
  it('emits an alias Opts and request body for a pure patternProperties link.schema', () => {
    const schema: HerokuSchema = {
      definitions: {
        'config-var': {
          type: ['object'],
          patternProperties: {
            '^\\w+$': { type: ['string'] },
          },
          links: [
            {
              title: 'Update',
              method: 'PATCH',
              href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/config-vars',
              schema: {
                type: ['object'],
                patternProperties: {
                  '^\\w+$': { type: ['string', 'null'] },
                },
              },
            },
          ],
        },
        app: {
          definitions: {
            identity: { type: ['string'] },
          },
        },
      },
    }
    const types = generateTypes(schema)
    expect(types).toContain('export type ConfigVarUpdateOpts = Record<string, string | null>')
    expect(types).toContain('update(appIdentity: string, requestBody: ConfigVarUpdateOpts)')

    const routes = generateRoutesJS(schema)
    expect(routes).toContain('"hasRequestBody": true')
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- src/gen/normalize-hyperschema.test.ts`

Expected: the new test fails. The `expect(types).toContain('export type ConfigVarUpdateOpts = ...')` assertion fails because no Opts type is emitted; or `expect(routes).toContain('"hasRequestBody": true')` fails. All other tests in this file still pass.

- [ ] **Step 3: Commit the failing test**

```bash
git add src/gen/normalize-hyperschema.test.ts
git commit -m "test: add failing test for patternProperties link schema"
```

---

## Task 2: Add `hasPatternProperties` and `hasRequestBodySchema` predicates

**Files:**
- Modify: `src/gen/normalize-hyperschema.ts` (add two methods next to `hasCustomProperties` at line 316)

- [ ] **Step 1: Insert two new methods after `hasCustomProperties`**

Locate the `hasCustomProperties` method (around line 316–319). Insert immediately after its closing brace:

```typescript
  private hasPatternProperties(node: SchemaNode | undefined): boolean {
    const resolved = this.resolveSchemaNode(node)
    return !!resolved?.patternProperties && Object.keys(resolved.patternProperties).length > 0
  }

  private hasRequestBodySchema(node: SchemaNode | undefined): boolean {
    return this.hasCustomProperties(node) || this.hasPatternProperties(node)
  }
```

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS (no type errors).

- [ ] **Step 3: Run the full test suite**

Run: `npm test`

Expected: all previously-passing tests still pass; the Task 1 test still fails (predicates exist but aren't wired in yet).

- [ ] **Step 4: Commit**

```bash
git add src/gen/normalize-hyperschema.ts
git commit -m "feat: add hasPatternProperties and hasRequestBodySchema predicates"
```

---

## Task 3: Emit an alias Opts aux type for pure-patternProperties link schemas

**Files:**
- Modify: `src/gen/normalize-hyperschema.ts` — `buildAuxTypes` (around lines 106–140)

- [ ] **Step 1: Add the alias-push branch to `buildAuxTypes`**

Locate `buildAuxTypes`. Currently the body is:

```typescript
  private buildAuxTypes(resourceName: string, definition: ResourceDefinition): AuxType[] {
    const auxTypes: AuxType[] = []
    for (const { link, titleKey } of this.resolveLinks(definition)) {
      // A $ref-shaped link.schema is inlined into a per-route Opts type, mirroring
      // what we do for inline schemas. We don't reuse a referenced top-level
      // resource as the Opts shape — request bodies and resource shapes diverge.
      const resolvedSchema = this.resolveSchemaNode(link.schema)
      if (this.hasCustomProperties(link.schema)) {
        auxTypes.push({
          kind: 'interface',
          name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts',
          description: link.description,
          shape: this.buildObjectShape(
            resolvedSchema!.properties!,
            resolvedSchema!.required ?? [],
          ),
        })
      }
```

Add an `else if` for the pattern-only case immediately after the `if (this.hasCustomProperties(link.schema)) { ... }` block, before the `const { resolved, crossResourceRef } = ...` line:

```typescript
      } else if (this.hasPatternProperties(link.schema)) {
        auxTypes.push({
          kind: 'alias',
          name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts',
          description: link.description,
          type: this.schemaToTypeRef(resolvedSchema!),
        })
      }
```

The `else if` keeps `properties` winning over `patternProperties` when both are present (per spec — mixed case is out of scope). `resolvedSchema` was already computed via `resolveSchemaNode(link.schema)` above; it has `type: ['object']` plus `patternProperties`, so `schemaToTypeRef` flows through `primitiveTypeToTypeRef`'s object branch and returns a `record` `TypeRef`.

- [ ] **Step 2: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 3: Run the test suite**

Run: `npm test`

Expected: the Task 1 test now partially advances — `expect(types).toContain('export type ConfigVarUpdateOpts = Record<string, string | null>')` passes — but the assertion `expect(types).toContain('update(appIdentity: string, requestBody: ConfigVarUpdateOpts)')` still fails because `buildMethods` hasn't been updated yet. All previously-passing tests still pass.

- [ ] **Step 4: Commit**

```bash
git add src/gen/normalize-hyperschema.ts
git commit -m "feat: emit alias Opts aux type for patternProperties link schemas"
```

---

## Task 4: Gate `requestBody` param and route flag on `hasRequestBodySchema`

**Files:**
- Modify: `src/gen/normalize-hyperschema.ts` — `buildMethods` (around line 170) and `routeEntries` (around line 464)

- [ ] **Step 1: Update `buildMethods`**

In `buildMethods`, change:

```typescript
      if (this.hasCustomProperties(link.schema)) {
        params.push({
          name: 'requestBody',
          type: {
            kind: 'reference',
            name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts',
          },
        })
      }
```

to:

```typescript
      if (this.hasRequestBodySchema(link.schema)) {
        params.push({
          name: 'requestBody',
          type: {
            kind: 'reference',
            name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts',
          },
        })
      }
```

- [ ] **Step 2: Update `routeEntries`**

In `routeEntries`, change:

```typescript
      if (this.hasCustomProperties(link.schema)) entry.hasRequestBody = true
```

to:

```typescript
      if (this.hasRequestBodySchema(link.schema)) entry.hasRequestBody = true
```

- [ ] **Step 3: Type-check**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 4: Run the test suite**

Run: `npm test`

Expected: the Task 1 test now fully passes. All previously-passing tests still pass.

- [ ] **Step 5: Commit**

```bash
git add src/gen/normalize-hyperschema.ts
git commit -m "feat: include patternProperties links in request body emission"
```

---

## Task 5: Add a multi-pattern test (first pattern wins)

**Files:**
- Test: `src/gen/normalize-hyperschema.test.ts`

- [ ] **Step 1: Append a multi-pattern test inside the new describe block**

Inside the `describe('normalizeHyperschema with patternProperties link schemas', ...)` block from Task 1, append a second `it` after the first one:

```typescript
  it('uses the first pattern when multiple patternProperties are defined', () => {
    const schema: HerokuSchema = {
      definitions: {
        widget: {
          links: [
            {
              title: 'Update',
              method: 'PATCH',
              href: '/widgets',
              schema: {
                type: ['object'],
                patternProperties: {
                  '^a.*$': { type: ['string'] },
                  '^b.*$': { type: ['number'] },
                },
              },
            },
          ],
        },
      },
    }
    const types = generateTypes(schema)
    expect(types).toContain('export type WidgetUpdateOpts = Record<string, string>')
  })
```

This locks in the existing `primitiveTypeToTypeRef` behavior of using the first pattern's value type (see `normalize-hyperschema.ts` line 287: `values[0]`).

- [ ] **Step 2: Run the new test**

Run: `npm test -- src/gen/normalize-hyperschema.test.ts`

Expected: PASS. The behavior is already correct from Task 3; this test pins it.

- [ ] **Step 3: Commit**

```bash
git add src/gen/normalize-hyperschema.test.ts
git commit -m "test: pin first-pattern-wins behavior for patternProperties"
```

---

## Task 6: Regenerate dist artifacts and verify the diff

**Files:**
- Regenerate: `dist/3.sdk/types.d.ts`, `dist/3.sdk/routes.js`, `dist/3.sdk/routes.d.ts`

- [ ] **Step 1: Regenerate the 3.sdk variant from the local fixture**

The CLI defaults to fetching from `api.heroku.com`. To use the checked-in fixture for a deterministic regeneration, run:

```bash
npm run generate
```

This fetches the live hyperschema. If you need an offline regeneration matching the test fixture exactly, use:

```bash
npx tsx src/cli.ts --variant 3.sdk --base-url file://$(pwd)/tests/__fixtures__
```

Note: only do the offline variant if the live fetch is unavailable; otherwise rely on `npm run generate` and accept that drift between the fixture and the live schema may produce additional unrelated changes.

Expected: command completes without errors. `dist/3.sdk/types.d.ts` and `dist/3.sdk/routes.js` are updated.

- [ ] **Step 2: Inspect the diff for `dist/3.sdk/types.d.ts`**

Run:

```bash
git diff dist/3.sdk/types.d.ts | head -120
```

Expected: two new `export type ...UpdateOpts = Record<string, string | null>` aliases for `ConfigVarUpdateOpts` and `PipelineConfigVarUpdateOpts`. The `HerokuClient.configVar.update` and `HerokuClient.pipelineConfigVar.update` method signatures gain a `requestBody: <…>UpdateOpts` parameter. No other unrelated changes.

If you see additional unrelated diffs (e.g. from upstream schema drift since the last regeneration), confirm they are not caused by this change — for example, by stashing and rerunning generate against the previous source — before committing.

- [ ] **Step 3: Inspect the diff for `dist/3.sdk/routes.js`**

Run:

```bash
git diff dist/3.sdk/routes.js | head -60
```

Expected: the `configVar.update` and `pipelineConfigVar.update` entries each gain `"hasRequestBody": true`.

- [ ] **Step 4: Type-check the regenerated artifacts**

Run:

```bash
npm run typecheck
```

Expected: PASS. (`tsconfig.json` includes `dist/**/*.d.ts`; the new alias types must compile cleanly.)

- [ ] **Step 5: Run the full test suite one more time**

Run:

```bash
npm test
```

Expected: all tests pass, including the two new ones from Tasks 1 and 5.

- [ ] **Step 6: Commit the regenerated artifacts**

```bash
git add dist/3.sdk/types.d.ts dist/3.sdk/routes.js dist/3.sdk/routes.d.ts
git commit -m "chore: regenerate 3.sdk artifacts with patternProperties support"
```

---

## Self-Review Notes

- **Spec coverage.** Each spec section maps to a task: predicates → Task 2; alias aux type → Task 3; method/route gating → Task 4; pure-pattern test → Task 1; multi-pattern test → Task 5; regenerated artifacts matching the spec's "Expected generated output" → Task 6.
- **Mixed properties + patternProperties.** Spec marks this out of scope. Task 3 uses `else if`, preserving the current `properties`-wins behavior.
- **Type/method names match spec exactly.** `ConfigVarUpdateOpts`, `PipelineConfigVarUpdateOpts`, predicate names `hasPatternProperties` / `hasRequestBodySchema`.
- **No emitter changes.** `emitAuxType` already handles `kind: 'alias'`; `renderType` already maps `record` → `Record<string, V>`. Verified in `src/gen/ts-emit.ts:61–68` and `:104–115`.
