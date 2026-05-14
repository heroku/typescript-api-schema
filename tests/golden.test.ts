import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateTypes } from '../src/gen/generator.js'
import type { HerokuSchema } from '../src/gen/schema-types.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const FIXTURES = resolve(HERE, '__fixtures__')
const GOLDENS = resolve(HERE, '__golden__')

describe('golden output regression', () => {
  it('3.sdk types match golden byte-for-byte', () => {
    const schema = JSON.parse(
      readFileSync(resolve(FIXTURES, 'heroku-schema-3.sdk.json'), 'utf8'),
    ) as HerokuSchema
    const golden = readFileSync(resolve(GOLDENS, '3.sdk-types.d.ts'), 'utf8')

    expect(generateTypes(schema)).toBe(golden)
  })
})
