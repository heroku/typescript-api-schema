# @heroku/types

This package provides Typescript types, based on and generated from the Heroku API Hyperschema. Type definition files are named for the API variant used to generate the file. For example, for the Heroku API variant: `3.sdk`, the type file is `heroku-3.sdk.d.ts`. This follows the pattern, `heroku-${variant}.d.ts`.

> NOTE: For now, this package only provides `heroku-3.sdk.d.ts` types.
## Installation

```sh
npm install @heroku/types
```

Types are available at the package root:

```ts
import type { Account, Addon } from '@heroku/types'
```

## Generating Type Definitions

The package includes a CLI that fetches the live Heroku API hyperschema and generates `.d.ts` files.

### Build the CLI

```sh
npm run build
```

This compiles the TypeScript source into `dist/`.

### Run the CLI

```sh
npm run generate
```

This fetches the schema from `https://api.heroku.com/schema` and writes the type definitions to the `types/` directory.

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
