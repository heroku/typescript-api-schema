import { describe, it, expect } from 'vitest'
import { generateTypes } from './generator.js'
import { generateRoutesJS } from './route-generator.js'
import type { HerokuSchema } from './schema-types.js'

// Regression tests for $ref-shaped link.schema. The hyperschema resolves
// reusable request body shapes by $ref (see filter-apps.Apps in the 3.sdk
// fixture), and the normalizer must inline them into Opts types, request
// body params, and route hasRequestBody flags.

describe('normalizeHyperschema with $ref link schemas', () => {
  it('emits Opts and request body for a $ref-only link.schema', () => {
    const schema: HerokuSchema = {
      definitions: {
        'filter-apps': {
          definitions: {
            filter: {
              type: ['object'],
              properties: {
                in: { type: ['string'] },
              },
            },
          },
          links: [
            {
              title: 'Apps',
              method: 'POST',
              href: '/filters/apps',
              schema: { $ref: '#/definitions/filter-apps/definitions/filter' },
            },
          ],
        },
      },
    }
    const types = generateTypes(schema)
    expect(types).toContain('export interface FilterAppsAppsOpts')
    expect(types).toContain('apps(requestBody: FilterAppsAppsOpts)')

    const routes = generateRoutesJS(schema)
    expect(routes).toContain('"hasRequestBody": true')
  })

  it('follows chained $refs to the underlying object schema', () => {
    const schema: HerokuSchema = {
      definitions: {
        widget: {
          definitions: {
            inner: {
              type: ['object'],
              properties: { name: { type: ['string'] } },
            },
            outer: { $ref: '#/definitions/widget/definitions/inner' },
          },
          links: [
            {
              title: 'Create',
              method: 'POST',
              href: '/widgets',
              schema: { $ref: '#/definitions/widget/definitions/outer' },
            },
          ],
        },
      },
    }
    const types = generateTypes(schema)
    expect(types).toContain('export interface WidgetCreateOpts')
    expect(types).toMatch(/WidgetCreateOpts\s*{[^}]*name\??:\s*string/)
  })

  it('does not emit Opts when $ref resolves to a non-object schema', () => {
    const schema: HerokuSchema = {
      definitions: {
        widget: {
          definitions: {
            id: { type: ['string'] },
          },
          links: [
            {
              title: 'Create',
              method: 'POST',
              href: '/widgets',
              schema: { $ref: '#/definitions/widget/definitions/id' },
            },
          ],
        },
      },
    }
    const types = generateTypes(schema)
    expect(types).not.toContain('WidgetCreateOpts')
    expect(types).not.toContain('requestBody')

    const routes = generateRoutesJS(schema)
    expect(routes).not.toContain('hasRequestBody')
  })
})

describe('normalizeHyperschema with patternProperties link schemas', () => {
  it('emits an alias Opts and request body for a pure patternProperties link.schema', () => {
    const schema: HerokuSchema = {
      definitions: {
        'config-var': {
          type: ['object'],
          patternProperties: {
            '^\\w+$': { type: ['string'] },
          },
          links: [
            {
              title: 'Update',
              method: 'PATCH',
              href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/config-vars',
              schema: {
                type: ['object'],
                patternProperties: {
                  '^\\w+$': { type: ['string', 'null'] },
                },
              },
            },
          ],
        },
        app: {
          definitions: {
            identity: { type: ['string'] },
          },
        },
      },
    }
    const types = generateTypes(schema)
    expect(types).toContain('export type ConfigVarUpdateOpts = Record<string, string | null>')
    expect(types).toContain('update(appIdentity: string, requestBody: ConfigVarUpdateOpts)')

    const routes = generateRoutesJS(schema)
    expect(routes).toContain('"hasRequestBody": true')
  })
})
