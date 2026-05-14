import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateTypes } from '../src/gen/generator.js'
import type { HerokuSchema } from '../src/gen/schema-types.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const FIXTURES = resolve(HERE, '__fixtures__')
const GOLDENS = resolve(HERE, '__golden__')

const schema = JSON.parse(
  readFileSync(resolve(FIXTURES, 'heroku-schema-3.sdk.json'), 'utf8'),
) as HerokuSchema
const golden = readFileSync(resolve(GOLDENS, '3.sdk-types.d.ts'), 'utf8')

describe('golden output regression', () => {
  afterEach(() => {
    delete process.env.HEROKU_TYPES_USE_MODEL
  })

  it('legacy renderer produces the golden', () => {
    delete process.env.HEROKU_TYPES_USE_MODEL
    expect(generateTypes(schema)).toBe(golden)
  })

  it('model-based path produces the golden when HEROKU_TYPES_USE_MODEL=1', () => {
    process.env.HEROKU_TYPES_USE_MODEL = '1'
    expect(generateTypes(schema)).toBe(golden)
  })
})
