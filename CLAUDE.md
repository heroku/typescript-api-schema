# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@heroku/types` generates TypeScript type definitions and a runtime route registry from the Heroku Platform API hyperschema. It fetches the JSON hyperschema from `api.heroku.com/schema`, walks the definitions, and emits `.d.ts` declaration files plus a `routes.js`/`routes.d.ts` pair containing method, path, and request-body metadata for every API endpoint.

## Commands

- **Run tests:** `npm test` (runs vitest)
- **Run a single test:** `npm test -- src/path/to/file.test.ts`
- **Type-check:** `npm run typecheck` (runs `tsc --noEmit`)
- **Generate types:** `npm run generate` (runs CLI via `tsx` → fetches schema → writes types + routes into `dist/<variant>/`)

The generator is executed directly from TypeScript via `tsx`; there is no compile step for the generator's own source. Generated artifacts go to `dist/`.

No lint or format scripts are configured yet.

## Architecture

- **Source:** `src/` — TypeScript source for the generator. Not part of the published package; executed directly with `tsx`.
- **Output:** `dist/` — generated `.d.ts` and `.js` files emitted by the CLI; this is what consumers import.
- **Module system:** esnext modules with bundler resolution
- **Runtime:** Node 22 (via `.tool-versions`)
- **Test framework:** Vitest (no custom config file — uses defaults)

TypeScript strict mode is enabled. `resolveJsonModule` is on for JSON schema imports. `tsconfig.json` sets `noEmit: true` since the generator is never compiled to JS on disk.

### Key modules

The two generator pipelines (hyperschema → `3.sdk`, Shogun + curated routes → `data`) share a single emitter. Each pipeline normalizes its input into an intermediate `TypesModel` and feeds it to `ts-emit.ts`.

- `src/cli.ts` — CLI entry point (`heroku-types` bin). Parses `--variant`, `--base-url` args. Orchestrates fetch → generate → verify → write. Also updates `package.json` exports/files for the variant.
- `src/data/routes.ts` — Hand-curated source of truth for the `data` variant's resource grouping. Typed via `as const satisfies Record<string, RouteDefinition>`. Compiled by the data pipeline into `dist/data/routes.{js,d.ts}`.
- `src/gen-data-types.ts` — Driver for the `data` variant. Imports `src/data/routes.ts`, loads Shogun `api_schemas.json`, calls `generateDataTypes()`, writes `dist/data/types.d.ts`, and uses `emitTypedSource` to emit `dist/data/routes.{js,d.ts}`.
- `src/gen/emit-typed-source.ts` — Generic helper that compiles a single typed `.ts` source file into `.js` + `.d.ts` via the TypeScript compiler API, optionally prepending a banner. Used by the data pipeline.
- `src/gen/schema.ts` — Fetches the hyperschema from Heroku API (default variant `3.sdk`).
- `src/gen/schema-types.ts` — TypeScript interfaces for the hyperschema (`HerokuSchema`, `SchemaNode`, `SchemaLink`, `RouteDefinition`, `HttpMethod`, etc.).
- `src/gen/utils.ts` — Pure string/schema utilities (`toPascalCase`, `toCamelCase`, `disambiguateLinkTitles`).
- `src/gen/model.ts` — Intermediate model: `TypesModel`, `ResourceModel`, `MethodModel`, `AuxType`, `ObjectShape`, `TypeRef`. The contract between normalizers and the emitter.
- `src/gen/ts-emit.ts` — `emitTypes(model, options?)` — pure model-to-text renderer. Owns every output style choice (quoting, indentation, JSDoc formatting, identifier escaping, union ordering, `HerokuClient` assembly).
- `src/gen/normalize-hyperschema.ts` — Heroku hyperschema → `TypesModel`. Resolves `$ref`, disambiguates link titles, parses hRef params, detects cross-resource targetSchemas. Also exports `extractRouteEntries()` for the route registry.
- `src/gen/normalize-data.ts` — Shogun JSON-Schemas + curated routes → `TypesModel`. Schemas without properties become `Record<string, unknown>` aliases. Also exports `summarizeCoverage()` for stats reporting.
- `src/gen/route-generator.ts` — Generates the route registry: `generateRoutesJS()` emits per-resource named exports with method/path/hasRequestBody, `generateRoutesDTS()` emits the corresponding `.d.ts`. Uses `extractRouteEntries()` from the hyperschema normalizer.
- `src/gen/generator.ts` — Thin pipeline driver: `generateTypes(schema) = emitTypes(normalizeHyperschema(schema))`.
- `src/gen/verify.ts` — Validates the emitted `.d.ts` content by running the TypeScript compiler in-memory and returning any diagnostics.

### Output style is owned by `ts-emit.ts`

When changing how emitted types look (quote style, indentation, JSDoc form, member ordering), edit `src/gen/ts-emit.ts`. Both pipelines pick up the change automatically. Don't add ad-hoc string concatenation in normalizers — produce the right `TypeRef`/`ObjectShape` shape and let the emitter handle it.

### Generated output

Generated files are written to a directory named after the variant (e.g. `3.sdk/`). The CLI writes three files per variant:

- `<variant>/types.d.ts` — TypeScript type definitions (interfaces, Opts/Result types, `HerokuClient`).
- `<variant>/routes.js` — Runtime route registry (per-resource named exports with `{ method, path, hasRequestBody? }`).
- `<variant>/routes.d.ts` — Type declarations for the route registry.

**Invariant:** Every file under `dist/` is generated. Hand-curated inputs that drive generation live in `src/` (e.g. `src/data/routes.ts`). It is safe to `rm -rf dist/` and rerun `npm run generate && npm run generate:data` to fully restore the directory.

Both variants emit `routes.d.ts` via `generateRoutesDTSForResources` in `src/gen/route-generator.ts` — `Record<string, RouteDefinition>` per resource, with `RouteDefinition` imported from the shared `dist/types.d.ts`. The data pipeline only uses `emitTypedSource` for the `routes.js` runtime artifact; the `.d.ts` is hand-emitted to keep both variants consistent.

Package exports are organized per variant (e.g. `@heroku/types/3.sdk` for types, `@heroku/types/3.sdk/routes` for routes). The CLI auto-updates `package.json` exports and files fields after generation.

Tests are colocated (e.g. `generator.test.ts` next to `generator.ts`).
