import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateTypes } from '../src/gen/generator.js'
import { generateRoutesJS } from '../src/gen/route-generator.js'
import { generateDataTypes, type RouteDef, type RouteSchema } from '../src/gen-data-types.js'
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

describe('golden output regression', () => {
  it('3.sdk types match the golden byte-for-byte', () => {
    expect(generateTypes(herokuSchema)).toBe(sdkGolden)
  })

  it('data types match the golden byte-for-byte', () => {
    expect(generateDataTypes(dataRoutes, shogunSchemas)).toBe(dataGolden)
  })

  // filter-apps.Apps is the canonical case where link.schema is a $ref to a
  // factored-out request body shape rather than inline properties. The
  // generated artifacts must reflect that the route takes a request body.
  it('filter-apps.Apps emits an Opts type and a hasRequestBody route entry', () => {
    const types = generateTypes(herokuSchema)
    expect(types).toContain('export interface FilterAppsAppsOpts')
    expect(types).toContain('apps(requestBody: FilterAppsAppsOpts)')

    const routes = generateRoutesJS(herokuSchema)
    expect(routes).toMatch(
      /export const filterApps = \{[^}]*"apps": \{[^}]*"hasRequestBody": true/,
    )
  })
})
