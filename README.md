# @heroku/types

This package provides TypeScript types and a runtime route registry, generated from the Heroku API Hyperschema. Generated files are organized by API variant. For example, the `3.sdk` variant outputs to `3.sdk/types.d.ts` and `3.sdk/routes.js`.

> NOTE: For now, this package only provides the `3.sdk` variant.

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

This compiles the TypeScript source into `dist/`.

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
