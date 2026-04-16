import { describe, it, expect } from 'vitest'
import { generateTypes } from './generator.js'
import type { HerokuSchema } from './template.js'

describe('generateTypes', () => {
  const schema: HerokuSchema = {
    definitions: {
      account: {
        required: ['id', 'verified'],
        properties: {
          id: { type: ['string'] },
          verified: { type: ['boolean'] },
        },
      },
      app: {
        required: ['id', 'name'],
        properties: {
          id: { type: ['string'] },
          name: { type: ['string'] },
        },
      },
      'config-var': {
        type: ['object'],
        // no properties — should be skipped
      },
    },
  }

  it('generates all resource interfaces', () => {
    const result = generateTypes(schema)
    expect(result).toContain('export interface Account')
    expect(result).toContain('export interface App')
  })

  it('skips definitions without properties', () => {
    const result = generateTypes(schema)
    expect(result).not.toContain('ConfigVar')
  })

  it('separates interfaces with blank lines', () => {
    const result = generateTypes(schema)
    expect(result).toContain('}\n\nexport interface')
  })
})
