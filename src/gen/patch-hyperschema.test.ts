import { describe, it, expect } from 'vitest'
import { generateTypes } from './generator.js'
import { generateRoutesJS } from './route-generator.js'
import { patchHyperschema } from './patch-hyperschema.js'
import type { HerokuSchema, SchemaNode } from './schema-types.js'

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

// The upstream hyperschema's space "Create" link doesn't declare a
// `kpi_url` property, even though the API accepts it (spaces:create forwards
// a hidden --kpi-url flag). patchHyperschema injects the optional property
// so the generated SpaceCreateOpts type carries it without the CLI needing
// an `as` cast.

function schemaWithSpaceCreateLink(): HerokuSchema {
  return {
    definitions: {
      space: {
        definitions: {
          identity: { type: ['string'] },
        },
        links: [
          {
            title: 'Create',
            description: 'Create a new space.',
            method: 'POST',
            rel: 'create',
            href: '/spaces',
            schema: {
              type: ['object'],
              properties: {
                name: { type: ['string'] },
              },
            },
            targetSchema: { $ref: '#/definitions/space' },
          },
        ],
      },
    },
  }
}

describe('patchHyperschema space Create kpi_url injection', () => {
  it('adds kpi_url (optional, type string) to the Create link schema', () => {
    const schema = schemaWithSpaceCreateLink()
    patchHyperschema(schema)
    const createLink = schema.definitions.space.links!.find(l => l.title === 'Create')!
    expect(createLink.schema!.properties!.kpi_url).toEqual({ type: ['string'] })
    expect(createLink.schema!.required ?? []).not.toContain('kpi_url')
  })

  it('self-heals to a no-op when kpi_url is already present', () => {
    const schema = schemaWithSpaceCreateLink()
    const existing: SchemaNode = { type: ['string'], description: 'already patched' }
    schema.definitions.space.links![0].schema!.properties!.kpi_url = existing
    patchHyperschema(schema)
    expect(schema.definitions.space.links![0].schema!.properties!.kpi_url).toBe(existing)
  })

  it('does not throw when there is no space definition', () => {
    const schema: HerokuSchema = { definitions: {} }
    expect(() => patchHyperschema(schema)).not.toThrow()
  })

  it('does not throw when the space has no Create link', () => {
    const schema: HerokuSchema = {
      definitions: {
        space: {
          links: [{ title: 'Info', method: 'GET', href: '/spaces/{id}' }],
        },
      },
    }
    expect(() => patchHyperschema(schema)).not.toThrow()
    expect(schema.definitions.space.links![0].schema).toBeUndefined()
  })
})

// The upstream hyperschema's space-topology apps-item property is named
// `formation` (singular), but the topology response is a straight
// control-plane passthrough whose live payload key is `formations`
// (plural) — the CLI has always read `app.formations`. patchHyperschema
// renames the property KEY (not the $ref definition target) so the
// generated SpaceTopology type matches the real payload.

function schemaWithSpaceTopology(): HerokuSchema {
  return {
    definitions: {
      'space-topology': {
        definitions: {
          formation: {
            type: ['object'],
            properties: {
              type: { type: ['string'] },
              quantity: { type: ['integer'] },
            },
          },
        },
        properties: {
          apps: {
            type: ['array'],
            items: {
              type: ['object'],
              properties: {
                name: { type: ['string'] },
                formation: {
                  type: ['array'],
                  items: { $ref: '#/definitions/space-topology/definitions/formation' },
                },
              },
            },
          },
        },
      },
    },
  }
}

describe('patchHyperschema space-topology formations rename', () => {
  it('renames the apps-item formation property to formations, preserving shape', () => {
    const schema = schemaWithSpaceTopology()
    patchHyperschema(schema)
    const appProps = schema.definitions['space-topology'].properties!.apps.items!.properties!
    expect(appProps.formation).toBeUndefined()
    expect(appProps.formations).toEqual({
      type: ['array'],
      items: { $ref: '#/definitions/space-topology/definitions/formation' },
    })
  })

  it('leaves the $ref definition target named formation', () => {
    const schema = schemaWithSpaceTopology()
    patchHyperschema(schema)
    expect(schema.definitions['space-topology'].definitions!.formation).toBeDefined()
  })

  it('self-heals to a no-op when formations is already present', () => {
    const schema = schemaWithSpaceTopology()
    const appItemProps = schema.definitions['space-topology'].properties!.apps.items!.properties!
    const existing = appItemProps.formation
    appItemProps.formations = existing
    delete appItemProps.formation
    patchHyperschema(schema)
    expect(appItemProps.formations).toBe(existing)
    expect(appItemProps.formation).toBeUndefined()
  })

  it('does not throw when there is no space-topology definition', () => {
    const schema: HerokuSchema = { definitions: {} }
    expect(() => patchHyperschema(schema)).not.toThrow()
  })

  it('does not throw when apps items have no formation property', () => {
    const schema: HerokuSchema = {
      definitions: {
        'space-topology': {
          properties: {
            apps: {
              type: ['array'],
              items: {
                type: ['object'],
                properties: { name: { type: ['string'] } },
              },
            },
          },
        },
      },
    }
    expect(() => patchHyperschema(schema)).not.toThrow()
    const appProps = schema.definitions['space-topology'].properties!.apps.items!.properties!
    expect(appProps.formations).toBeUndefined()
  })
})
