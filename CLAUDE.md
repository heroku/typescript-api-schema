# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@heroku/types` generates TypeScript type definitions from the Heroku Platform API hyperschema. It fetches the JSON hyperschema from `api.heroku.com/schema`, walks the definitions, and emits `.d.ts` declaration files.

## Commands

- **Run tests:** `npm test` (runs vitest)
- **Run a single test:** `npm test -- src/path/to/file.test.ts`
- **Type-check:** `npx tsc --noEmit`
- **Build:** `npm run build` (outputs to `dist/`)
- **Generate types:** `npm run generate` (runs CLI → fetches schema → writes `.d.ts`)

No lint or format scripts are configured yet.

## Architecture

- **Source:** `src/` — TypeScript source files (compiled with rootDir `src/`)
- **Output:** `dist/` — compiled JS + declaration files (declaration generation enabled)
- **Module system:** ES2020 modules with bundler resolution
- **Runtime:** Node 22 (via `.tool-versions`)
- **Test framework:** Vitest (no custom config file — uses defaults)

TypeScript strict mode is enabled. `resolveJsonModule` is on for JSON schema imports.

### Key modules

- `src/cli.ts` — CLI entry point (`heroku-types` bin). Parses `--variant`, `--base-url` args. Orchestrates fetch → generate → verify → write.
- `src/gen/schema.ts` — Fetches the hyperschema from Heroku API (default variant `3.sdk`).
- `src/gen/template.ts` — Barrel re-export for the rendering pipeline. The actual implementations are split across:
  - `src/gen/schema-types.ts` — TypeScript interfaces for the hyperschema (`HerokuSchema`, `SchemaNode`, `SchemaLink`, etc.).
  - `src/gen/utils.ts` — Pure string/schema utilities (`toPascalCase`, `toCamelCase`, `renderJSDoc`, `disambiguateLinkTitles`).
  - `src/gen/render.ts` — `TypeRenderer` class that converts a parsed hyperschema into `.d.ts` content (resource interfaces, link Opts/Result types, `HerokuClient` interface).
- `src/gen/generator.ts` — Iterates schema definitions, drives `TypeRenderer`, and assembles the final type output with a generated-content preamble.
- `src/gen/verify.ts` — Validates the emitted `.d.ts` content by running the TypeScript compiler in-memory and returning any diagnostics.

Tests are colocated (e.g. `generator.test.ts` next to `generator.ts`).
