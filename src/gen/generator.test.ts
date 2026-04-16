import { describe, it, expect } from 'vitest'
import { generateTypes, DuplicateLinkTitleError } from './generator.js'
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

  it('throws on duplicate link titles within a resource', () => {
    const dupeSchema: HerokuSchema = {
      definitions: {
        app: {
          properties: { id: { type: ['string'] } },
          links: [
            { title: 'Create', method: 'POST', href: '/apps' },
            { title: 'create', method: 'POST', href: '/apps' },
          ],
        },
      },
    }
    expect(() => generateTypes(dupeSchema)).toThrow(DuplicateLinkTitleError)
    expect(() => generateTypes(dupeSchema)).toThrow(/duplicate link title "create" in resource "app"/)
  })

  it('allows same title across different resources', () => {
    const schema: HerokuSchema = {
      definitions: {
        app: {
          required: ['id'],
          properties: { id: { type: ['string'] } },
          links: [{ title: 'List', method: 'GET', href: '/apps', rel: 'instances' }],
        },
        addon: {
          required: ['id'],
          properties: { id: { type: ['string'] } },
          links: [{ title: 'List', method: 'GET', href: '/addons', rel: 'instances' }],
        },
      },
    }
    expect(() => generateTypes(schema)).not.toThrow()
  })
})
