import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateTypes } from '../src/gen/generator.js'
import { plan, render, type RouteDef, type RouteSchema } from '../src/gen-data-types.js'
import type { HerokuSchema } from '../src/gen/schema-types.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const FIXTURES = resolve(HERE, '__fixtures__')
const GOLDENS = resolve(HERE, '__golden__')

const herokuSchema = JSON.parse(
  readFileSync(resolve(FIXTURES, 'heroku-schema-3.sdk.json'), 'utf8'),
) as HerokuSchema
const sdkGolden = readFileSync(resolve(GOLDENS, '3.sdk-types.d.ts'), 'utf8')

const dataGolden = readFileSync(resolve(GOLDENS, 'data-types.d.ts'), 'utf8')
const shogunSchemas = JSON.parse(
  readFileSync(resolve(FIXTURES, 'shogun-schemas.json'), 'utf8'),
) as Record<string, RouteSchema>

// Routes fixture is JSON (not .js) so iteration order is deterministic
// across runtimes — vitest and Node treat dynamic ESM imports' key order
// differently, which would otherwise cause the golden to diverge between
// production (Node) and the test (vitest).
const dataRoutes = JSON.parse(
  readFileSync(resolve(FIXTURES, 'data-routes.json'), 'utf8'),
) as Record<string, Record<string, RouteDef>>

function generateDataTypes(): string {
  return render(plan(dataRoutes, shogunSchemas))
}

describe('golden output regression — 3.sdk', () => {
  afterEach(() => {
    delete process.env.HEROKU_TYPES_USE_MODEL
  })

  it('legacy renderer produces the golden', () => {
    delete process.env.HEROKU_TYPES_USE_MODEL
    expect(generateTypes(herokuSchema)).toBe(sdkGolden)
  })

  it('model-based path produces the golden when HEROKU_TYPES_USE_MODEL=1', () => {
    process.env.HEROKU_TYPES_USE_MODEL = '1'
    expect(generateTypes(herokuSchema)).toBe(sdkGolden)
  })
})

describe('golden output regression — data', () => {
  afterEach(() => {
    delete process.env.HEROKU_TYPES_USE_MODEL
  })

  it('legacy renderer produces the golden', () => {
    delete process.env.HEROKU_TYPES_USE_MODEL
    expect(generateDataTypes()).toBe(dataGolden)
  })

  it('model-based path produces the golden when HEROKU_TYPES_USE_MODEL=1', () => {
    process.env.HEROKU_TYPES_USE_MODEL = '1'
    expect(generateDataTypes()).toBe(dataGolden)
  })
})
