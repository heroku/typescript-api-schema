import { describe, it, expect } from 'vitest'
import { generateTypes } from './generator.js'
import { generateRoutesJS } from './route-generator.js'
import { patchHyperschema } from './patch-hyperschema.js'
import type { HerokuSchema } from './schema-types.js'

// The upstream hyperschema omits the request body on the app "Refresh ACM"
// PATCH link, so the generator would emit no requestBody param and no
// hasRequestBody flag. patchHyperschema injects { acm_refresh: boolean } so
// both outputs reflect what the API actually requires. These tests exercise
// the injection through the shared normalizer path (generateTypes /
// generateRoutesJS), the same path the golden test uses.

function appWithRefreshACM(): HerokuSchema {
  return {
    definitions: {
      app: {
        definitions: {
          identity: { type: ['string'] },
        },
        links: [
          {
            title: 'Refresh ACM',
            description: 'Refresh ACM for an app',
            method: 'PATCH',
            rel: 'update',
            href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/acm',
            targetSchema: { $ref: '#/definitions/app' },
          },
        ],
      },
    },
  }
}

describe('patchHyperschema Refresh ACM injection', () => {
  it('emits AppRefreshACMOpts and a requestBody param after normalization', () => {
    const types = generateTypes(appWithRefreshACM())
    expect(types).toContain('export interface AppRefreshACMOpts')
    expect(types).toContain('refreshACM(appIdentity: string, requestBody: AppRefreshACMOpts)')
  })

  it('sets hasRequestBody: true on the refreshACM route', () => {
    const routes = generateRoutesJS(appWithRefreshACM())
    expect(routes).toContain('"refreshACM"')
    expect(routes).toContain('"hasRequestBody": true')
  })

  it('injects the acm_refresh boolean schema onto a schema-less link', () => {
    const schema = appWithRefreshACM()
    patchHyperschema(schema)
    const link = schema.definitions.app.links!.find(l => l.title === 'Refresh ACM')!
    expect(link.schema).toEqual({
      type: ['object'],
      properties: { acm_refresh: { type: ['boolean'] } },
      required: ['acm_refresh'],
    })
  })

  it('leaves a link that already has a schema untouched', () => {
    const schema = appWithRefreshACM()
    const existing = {
      type: ['object'],
      properties: { custom: { type: ['string'] } },
    }
    schema.definitions.app.links![0].schema = existing
    patchHyperschema(schema)
    expect(schema.definitions.app.links![0].schema).toBe(existing)
  })

  it('does not throw when there is no app definition', () => {
    const schema: HerokuSchema = { definitions: {} }
    expect(() => patchHyperschema(schema)).not.toThrow()
    expect(patchHyperschema(schema)).toBe(schema)
  })

  it('does not throw when app has no matching Refresh ACM link', () => {
    const schema: HerokuSchema = {
      definitions: {
        app: {
          links: [
            { title: 'Info', method: 'GET', href: '/apps/{id}' },
          ],
        },
      },
    }
    expect(() => patchHyperschema(schema)).not.toThrow()
    expect(schema.definitions.app.links![0].schema).toBeUndefined()
  })
})
