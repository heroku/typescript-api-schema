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

  it('emits type alias for definitions with type but no properties', () => {
    const result = generateTypes(schema)
    expect(result).toContain('export type ConfigVar = Record<string, unknown>')
  })

  it('skips definitions with neither properties nor type', () => {
    const schemaWithEmpty: HerokuSchema = {
      definitions: {
        app: {
          required: ['id'],
          properties: { id: { type: ['string'] } },
        },
        empty: {},
      },
    }
    const result = generateTypes(schemaWithEmpty)
    expect(result).not.toContain('Empty')
  })

  it('separates interfaces with blank lines', () => {
    const result = generateTypes(schema)
    expect(result).toContain('}\n\nexport interface')
  })

  it('generates link Opts and Result types', () => {
    const schemaWithLinks: HerokuSchema = {
      definitions: {
        app: {
          required: ['id'],
          properties: {
            id: { type: ['string'] },
          },
          links: [
            {
              title: 'Create',
              method: 'POST',
              href: '/apps',
              schema: {
                properties: { name: { type: ['string'] } },
                required: ['name'],
              },
              targetSchema: {
                properties: {
                  id: { type: ['string'] },
                  name: { type: ['string'] },
                },
                required: ['id', 'name'],
              },
            },
          ],
        },
      },
    }
    const result = generateTypes(schemaWithLinks)
    expect(result).toContain('export interface App')
    expect(result).toContain('export interface AppCreateOpts')
    expect(result).toContain('export interface AppCreateResult')
  })

  it('generates HerokuClient interface from links', () => {
    const schemaWithLinks: HerokuSchema = {
      definitions: {
        app: {
          definitions: {
            id: { type: ['string'] },
          },
          required: ['id'],
          properties: {
            id: { type: ['string'] },
          },
          links: [
            {
              title: 'List',
              method: 'GET',
              href: '/apps',
              rel: 'instances',
            },
          ],
        },
      },
    }
    const result = generateTypes(schemaWithLinks)
    expect(result).toContain('export interface HerokuClient')
    expect(result).toContain('list(): Promise<App[]>')
  })

  it('generates valid types for property-less resources with links', () => {
    const schemaWithPropertyless: HerokuSchema = {
      definitions: {
        'config-var': {
          type: ['object'],
          patternProperties: { '^\\w+$': { type: ['string', 'null'] } },
          links: [
            { title: 'Update', method: 'PATCH', href: '/config-vars' },
          ],
        },
      },
    }
    const result = generateTypes(schemaWithPropertyless)
    expect(result).toContain('export type ConfigVar = Record<string, string | null>')
    expect(result).toContain('update(): Promise<ConfigVar>')
  })

  it('disambiguates duplicate link titles by appending HTTP method', () => {
    const dupeSchema: HerokuSchema = {
      definitions: {
        app: {
          required: ['id'],
          properties: { id: { type: ['string'] } },
          links: [
            {
              title: 'List',
              method: 'GET',
              href: '/apps',
              rel: 'instances',
              schema: { properties: { filter: { type: ['string'] } } },
            },
            {
              title: 'List',
              method: 'POST',
              href: '/apps',
              schema: { properties: { query: { type: ['string'] } } },
            },
          ],
        },
      },
    }
    const result = generateTypes(dupeSchema)
    expect(result).toContain('AppListGetOpts')
    expect(result).toContain('AppListPostOpts')
    expect(result).toContain('listGet(')
    expect(result).toContain('listPost(')
  })
})
