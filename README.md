# @heroku/types

This package provides TypeScript types and a runtime route registry, generated from the Heroku API Hyperschema. Generated files are organized by API variant. For example, the `3.sdk` variant outputs to `dist/3.sdk/types.d.ts` and `dist/3.sdk/routes.js`.

> NOTE: This package currently provides two variants: `3.sdk` (Heroku Platform API, fully generated from the hyperschema) and `data` (Heroku's data services surface, where types are generated from the `heroku/data-api` OpenAPI spec against a hand-curated resource grouping).

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

### Run the CLI

```sh
npm run generate
```

This fetches the schema from `https://api.heroku.com/schema` and writes the generated files into `dist/<variant>/` (e.g. `dist/3.sdk/`). It also updates `package.json` exports automatically. The CLI is executed directly from TypeScript via `tsx` — no separate build step is required.

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

## The `data` variant

The `data` variant covers Heroku's data services surface. Types are generated from the OpenAPI 3.0.1 spec fetched live at generate time from the data-api team's staging Rswag endpoint, against a hand-curated resource grouping in `src/data/routes.ts`. The body of `dist/data/types.d.ts` — every `*Opts` and `*Result` interface, plus the `HerokuClient` method signatures — is generated from the spec. The runtime route registry at `dist/data/routes.{js,d.ts}` is compiled from `src/data/routes.ts` by the same pipeline. Tests use a pinned fixture spec (`tests/__fixtures__/data-api-swagger.yaml`) instead of hitting the live endpoint.

### Pipeline

1. **Generate types in this repo:**
   ```sh
   npm run generate:data
   ```
   This fetches the spec live from staging (see `src/gen/data-schema.ts`) for request/response schemas, reads `src/data/routes.ts` for the curated resource grouping, emits `dist/data/types.d.ts`, and emits `dist/data/routes.{js,d.ts}` from the same source. A curated route with no match in the spec aborts generation with an error naming the offending HTTP method and path template — the spec is treated as authoritative, so an unmatched route means `routes.ts` needs fixing, not that coverage is expected to be incomplete.

2. **Refreshing the pinned test fixture.** 
    When `heroku/data-api` publishes spec changes, update `tests/__fixtures__/data-api-swagger.yaml` to match. Review the diff to `dist/data/types.d.ts` and `tests/__golden__/data-types.d.ts` like any other generated-artifact change.

### What the generator preserves

The grouping in `src/data/routes.ts` is the source of truth. The generator never invents new resources or moves methods between resources — it only fills in `Opts`/`Result` types from the spec. To add or rename a resource, edit `src/data/routes.ts` and re-run the generator. **Do not edit `dist/data/routes.{js,d.ts}` directly** — those files are regenerated on every `npm run generate:data` invocation.

### Why grouping is curated

The spec's path structure was designed for the service that owns it, not for an SDK. The same logical resource can span multiple path prefixes, and similar names can be genuinely different APIs:

- `transfer` spans `/client/v11/apps/{name}/transfers/*` and `/client/v11/databases/{name}/transfers/*`
- `postgres` and `postgresDatabase` both relate to Postgres but live under `/data/postgres/v1/*` and `/postgres/v0/databases/*`

## Running Tests

```sh
npm test
```

This runs the test suite via [Vitest](https://vitest.dev/).

To run tests in watch mode during development:

```sh
npm run test:watch
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security issues should be reported per [SECURITY](SECURITY).

## License

MIT — see [LICENSE](LICENSE).
