# @heroku/types

This package provides TypeScript types and a runtime route registry, generated from the Heroku API Hyperschema. Generated files are organized by API variant. For example, the `3.sdk` variant outputs to `3.sdk/types.d.ts` and `3.sdk/routes.js`.

> NOTE: This package currently provides two variants: `3.sdk` (Heroku Platform API, fully generated from the hyperschema) and `data` (Heroku's data services control plane / Shogun, where types are generated from spec-captured payloads against a hand-curated resource grouping).

## Installation

```sh
npm install @heroku/types
```

Types are available under the variant subpath:

```ts
import type { Account, Addon } from '@heroku/types/3.sdk'
```

A runtime route registry is also available, providing method, path, and request-body metadata for each API endpoint:

```ts
import { app, dyno } from '@heroku/types/3.sdk/routes'

console.log(app.create) // { method: 'POST', path: '/apps', hasRequestBody: true }
console.log(dyno.list)  // { method: 'GET', path: '/apps/{appId}/dynos' }
```

## Generating Type Definitions

The package includes a CLI that fetches the live Heroku API hyperschema and generates type definitions and a route registry. Before writing files to the file system, the type output is verified against the TypeScript type checker to ensure we're only writing valid definitions.

### Build the CLI

```sh
npm run build
```

This compiles the TypeScript source into `build/`.

### Run the CLI

```sh
npm run generate
```

This fetches the schema from `https://api.heroku.com/schema` and writes the generated files to a directory named after the variant (e.g. `3.sdk/`). It also updates `package.json` exports automatically.

#### CLI Options

```
Usage: heroku-types [options]

Options:
  --variant <variant>   Schema variant (default: 3.sdk)
  --base-url <url>      Schema endpoint (default: https://api.heroku.com/schema)
  --help                Show this help message
```

For example, to generate types for a different schema variant:

```sh
npm run generate -- --variant 3.webhooks
```

## The `data` variant (Shogun)

The `data` variant covers Heroku's data services control plane (Shogun). Unlike `3.sdk`, Shogun does not publish a hyperschema, so the resource grouping in `data/routes.js` and `data/types.d.ts` is curated by hand. The body of `data/types.d.ts` — every `*Opts` and `*Result` interface, plus the `HerokuClient` method signatures — is generated from request/response payloads captured during Shogun's spec suite.

### Pipeline

1. **Capture payloads in Shogun.** From a Shogun checkout, with the spec DB running:
   ```sh
   bundle exec rspec spec/shogun/endpoints
   bundle exec rake api_schemas:build
   ```
   This writes `tmp/api_schemas.json` (schemas keyed by `"VERB /path"`).

2. **Generate types in this repo.** Point the generator at the artifact:
   ```sh
   SHOGUN_SCHEMA_PATH=/path/to/shogun/tmp/api_schemas.json npm run generate:data
   ```
   This reads `data/routes.js` for the curated resource grouping and emits `data/types.d.ts`. Methods with no schema coverage are typed as `Promise<unknown>` and annotated with a `// TODO: no spec coverage` comment.

### What the generator preserves

The grouping in `data/routes.js` is the source of truth. The generator never invents new resources or moves methods between resources — it only fills in `Opts`/`Result` types from the schema artifact. To add or rename a resource, edit `data/routes.js` (and optionally `data/routes.d.ts`) and re-run the generator.

## Running Tests

```sh
npm test
```

This runs the test suite via [Vitest](https://vitest.dev/).

To run tests in watch mode during development:

```sh
npm run test:watch
```

## License

MIT
