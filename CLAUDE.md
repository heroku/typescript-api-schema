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

- `src/cli.ts` — CLI entry point (`heroku-types` bin). Parses `--variant`, `--base-url`, `--output` args.
- `src/gen/schema.ts` — Fetches the hyperschema from Heroku API (default variant `3.sdk`).
- `src/gen/template.ts` — Schema type definitions (`HerokuSchema`, `SchemaNode`, etc.) and core rendering functions: `resolveRef`, `schemaTypeToTS`, `renderProperties`, `renderResourceInterface`.
- `src/gen/generator.ts` — Iterates schema definitions and assembles the final type output.

Tests are colocated (e.g. `generator.test.ts` next to `generator.ts`).
