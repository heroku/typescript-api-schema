# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@heroku/types` generates TypeScript type definitions and a runtime route registry from the Heroku Platform API hyperschema. It fetches the JSON hyperschema from `api.heroku.com/schema`, walks the definitions, and emits `.d.ts` declaration files plus a `routes.js`/`routes.d.ts` pair containing method, path, and request-body metadata for every API endpoint.

## Commands

- **Run tests:** `npm test` (runs vitest)
- **Run a single test:** `npm test -- src/path/to/file.test.ts`
- **Type-check:** `npx tsc --noEmit`
- **Build:** `npm run build` (outputs to `dist/`)
- **Generate types:** `npm run generate` (runs CLI → fetches schema → writes types + routes into `<variant>/`)

No lint or format scripts are configured yet.

## Architecture

- **Source:** `src/` — TypeScript source files (compiled with rootDir `src/`)
- **Output:** `dist/` — compiled JS + declaration files (declaration generation enabled)
- **Module system:** ES2020 modules with bundler resolution
- **Runtime:** Node 22 (via `.tool-versions`)
- **Test framework:** Vitest (no custom config file — uses defaults)

TypeScript strict mode is enabled. `resolveJsonModule` is on for JSON schema imports.

### Key modules

- `src/cli.ts` — CLI entry point (`heroku-types` bin). Parses `--variant`, `--base-url` args. Orchestrates fetch → generate → verify → write. Also updates `package.json` exports/files for the variant.
- `src/gen/schema.ts` — Fetches the hyperschema from Heroku API (default variant `3.sdk`).
- `src/gen/template.ts` — Barrel re-export for the rendering pipeline. The actual implementations are split across:
  - `src/gen/schema-types.ts` — TypeScript interfaces for the hyperschema (`HerokuSchema`, `SchemaNode`, `SchemaLink`, `RouteDefinition`, `HttpMethod`, etc.).
  - `src/gen/utils.ts` — Pure string/schema utilities (`toPascalCase`, `toCamelCase`, `renderJSDoc`, `disambiguateLinkTitles`).
  - `src/gen/render.ts` — `TypeRenderer` class that converts a parsed hyperschema into `.d.ts` content (resource interfaces, link Opts/Result types, `HerokuClient` interface) and route entries via `renderRouteEntries()`.
- `src/gen/route-generator.ts` — Generates the route registry: `generateRoutesJS()` emits per-resource named exports with method/path/hasRequestBody, `generateRoutesDTS()` emits the corresponding `.d.ts`.
- `src/gen/generator.ts` — Iterates schema definitions, drives `TypeRenderer`, and assembles the final type output with a generated-content preamble.
- `src/gen/verify.ts` — Validates the emitted `.d.ts` content by running the TypeScript compiler in-memory and returning any diagnostics.

### Generated output

Generated files are written to a directory named after the variant (e.g. `3.sdk/`). The CLI writes three files per variant:

- `<variant>/types.d.ts` — TypeScript type definitions (interfaces, Opts/Result types, `HerokuClient`).
- `<variant>/routes.js` — Runtime route registry (per-resource named exports with `{ method, path, hasRequestBody? }`).
- `<variant>/routes.d.ts` — Type declarations for the route registry.

Package exports are organized per variant (e.g. `@heroku/types/3.sdk` for types, `@heroku/types/3.sdk/routes` for routes). The CLI auto-updates `package.json` exports and files fields after generation.

Tests are colocated (e.g. `generator.test.ts` next to `generator.ts`).
