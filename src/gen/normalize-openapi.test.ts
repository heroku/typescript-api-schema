import { describe, it, expect } from 'vitest'
import { normalizeOpenApi, summarizeOpenApiCoverage } from './normalize-openapi.js'
import type { AuxType } from './model.js'
import type { OpenApiDocument, OpenApiSchemaOrRef } from './openapi-types.js'
import type { RouteDefinition } from './schema-types.js'

function spec(over: Partial<OpenApiDocument>): OpenApiDocument {
  return { paths: {}, components: { schemas: {} }, ...over }
}

function routes(entries: Record<string, RouteDefinition>): Record<string, Record<string, RouteDefinition>> {
  return { widget: entries }
}

function expectAuxInterface(aux: AuxType | undefined): Extract<AuxType, { kind: 'interface' }> {
  expect(aux?.kind).toBe('interface')
  if (aux?.kind !== 'interface') throw new Error('expected interface aux type')
  return aux
}

describe('route matching', () => {
  it('matches a curated route to a spec path item', () => {
    const doc = spec({
      paths: {
        '/widgets/{widget_id}': {
          get: { responses: { '200': { content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' } } } } } } } },
        },
      },
    })
    const model = normalizeOpenApi(routes({ info: { method: 'GET', path: '/widgets/{widget_id}' } }), doc)
    const method = model.client?.resources[0].methods[0]
    expect(method?.name).toBe('info')
    expect(method?.params).toEqual([
      { name: 'widget_id', type: { kind: 'primitive', primitive: 'string' } },
    ])
  })

  it('throws when the path exists but the HTTP method does not', () => {
    const doc = spec({ paths: { '/widgets': { post: { responses: {} } } } })
    expect(() => normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets' } }), doc))
      .toThrow(/No spec match for GET \/widgets/)
  })

  it('throws when a curated param name differs from the spec', () => {
    const doc = spec({
      paths: {
        '/widgets/{widget_id}': { get: { responses: {} } },
      },
    })
    expect(() => normalizeOpenApi(routes({ info: { method: 'GET', path: '/widgets/{uuid}' } }), doc))
      .toThrow(/No spec match for GET \/widgets\/{uuid}/)
  })
})

describe('hasRequestBody parity', () => {
  it('throws when routes.ts and the spec disagree on hasRequestBody', () => {
    expect(() => normalizeOpenApi(
      routes({ create: { method: 'POST', path: '/widgets', hasRequestBody: true } }),
      spec({ paths: { '/widgets': { post: { responses: {} } } } }),
    )).toThrow(/hasRequestBody mismatch/)

    expect(() => normalizeOpenApi(
      routes({ create: { method: 'POST', path: '/widgets' } }),
      spec({ paths: { '/widgets': { post: { requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } } } } } }, responses: {} } } } }),
    )).toThrow(/hasRequestBody mismatch/)
  })

  it('throws when routes.ts configures hasRequestBody but the spec declares a non-JSON body', () => {
    expect(() => normalizeOpenApi(
      routes({ create: { method: 'POST', path: '/widgets', hasRequestBody: true } }),
      spec({
        paths: {
          '/widgets': {
            post: {
              requestBody: { content: { 'text/plain': { schema: { type: 'string' } } } },
              responses: {},
            },
          },
        },
      }),
    )).toThrow(/hasRequestBody mismatch/)
  })

  it('adds a requestBody param when hasRequestBody agrees with the spec', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          post: {
            requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } } } } } },
            responses: {},
          },
        },
      },
    })
    const model = normalizeOpenApi(routes({ create: { method: 'POST', path: '/widgets', hasRequestBody: true } }), doc)
    expect(model.client?.resources[0].methods[0].params).toEqual([
      { name: 'requestBody', type: { kind: 'reference', name: 'WidgetCreateOpts' } },
    ])
  })
})

describe('query param parity', () => {
  it('throws when the spec and routes.ts disagree on query params', () => {
    expect(() => normalizeOpenApi(
      routes({ list: { method: 'GET', path: '/widgets' } }), 
      spec({ paths: { '/widgets': { get: { parameters: [{ name: 'limit', in: 'query' }], responses: {} } } } }),
    )).toThrow(/query param mismatch/)

    expect(() => normalizeOpenApi(
      routes({ list: { method: 'GET', path: '/widgets', query: ['limit'] } }),
      spec({ paths: { '/widgets': { get: { responses: {} } } } }),
    )).toThrow(/query param mismatch/)
  })

  it('does not throw when query params agree', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: { parameters: [{ name: 'b', in: 'query' }, { name: 'a', in: 'query' }], responses: {} },
        },
      },
    })
    const model = normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets', query: ['a', 'b'] } }), doc)
    expect(model.client?.resources[0].methods[0].params).toEqual([
      {
        name: 'query',
        type: {
          kind: 'object',
          shape: {
            properties: [
              { key: 'a', type: { kind: 'primitive', primitive: 'string' }, required: false },
              { key: 'b', type: { kind: 'primitive', primitive: 'string' }, required: false },
            ],
          },
        },
      },
    ])
  })

  it('merges a path-item-level query parameter', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          parameters: [{ name: 'limit', in: 'query' }],
          get: { responses: {} },
        },
      },
    })
    expect(() => normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets', query: ['limit'] } }), doc))
      .not.toThrow()
    expect(() => normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets' } }), doc))
      .toThrow(/query param mismatch/)
  })

  it('lowers a query parameter from its schema', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            parameters: [
              { name: 'forced', in: 'query', schema: { type: 'boolean' } },
              { name: 'limit', in: 'query', schema: { type: 'integer' } },
            ],
            responses: {},
          },
        },
      },
    })
    const model = normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets', query: ['forced', 'limit'] } }), doc)
    expect(model.client?.resources[0].methods[0].params).toEqual([
      {
        name: 'query',
        type: {
          kind: 'object',
          shape: {
            properties: [
              { key: 'forced', type: { kind: 'primitive', primitive: 'boolean' }, required: false },
              { key: 'limit', type: { kind: 'primitive', primitive: 'number' }, required: false },
            ],
          },
        },
      },
    ])
  })

  it('marks a query parameter required when the spec declares required: true', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            parameters: [{ name: 'limit', in: 'query', required: true, schema: { type: 'integer' } }],
            responses: {},
          },
        },
      },
    })
    const model = normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets', query: ['limit'] } }), doc)
    expect(model.client?.resources[0].methods[0].params).toEqual([
      {
        name: 'query',
        type: {
          kind: 'object',
          shape: {
            properties: [
              { key: 'limit', type: { kind: 'primitive', primitive: 'number' }, required: true },
            ],
          },
        },
      },
    ])
  })
})

describe('$ref resolution', () => {
  it('follows a chain of schema $refs', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            responses: {
              '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Widget' } } } },
            },
          },
        },
      },
      components: {
        schemas: {
          Widget: { $ref: '#/components/schemas/WidgetBody' },
          WidgetBody: { type: 'object', properties: { name: { type: 'string' } } },
        },
      },
    })
    const model = normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets' } }), doc)
    const result = expectAuxInterface(model.resources[0].auxTypes.find(a => a.name === 'WidgetListResult'))
    expect(model.resources[0].auxTypes.map(a => a.name)).not.toContain('WidgetBody')
    expect(result.shape.properties[0]).toEqual({
      key: 'name', type: { kind: 'primitive', primitive: 'string' }, required: false,
    })
  })

  it('throws when a schema $ref does not target components.schemas', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            responses: {
              '200': { content: { 'application/json': { schema: { $ref: '#/components/responses/Ok' } } } },
            },
          },
        },
      },
    })
    expect(() => normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets' } }), doc))
      .toThrow(/Unsupported \$ref target/)
  })

  it('throws when a schema $ref name is missing from components.schemas', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            responses: {
              '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/Missing' } } } },
            },
          },
        },
      },
    })
    expect(() => normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets' } }), doc))
      .toThrow(/Could not resolve \$ref: #\/components\/schemas\/Missing/)
  })

  it('throws when not a schema $ref', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            parameters: [{ $ref: '#/components/parameters/Limit' }],
            responses: {},
          },
        },
      },
    })
    expect(() => normalizeOpenApi(routes({ list: { method: 'GET', path: '/widgets' } }), doc))
      .toThrow(/Unsupported \$ref/)
  })
})

describe('principal response selection', () => {
  function build(responses: Record<string, unknown>, opts: { hasRequestBody?: true } = {}) {
    const doc = spec({
      paths: { '/widgets': { post: { responses: responses as never, ...(opts.hasRequestBody ? { requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } } } } } } } : {}) } } },
    })
    return normalizeOpenApi(routes({ create: { method: 'POST', path: '/widgets', ...opts } }), doc)
  }

  it('prefers 200 over 201 when both are present', () => {
    const model = build({
      '201': { content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' } } } } } },
      '200': { content: { 'application/json': { schema: { type: 'object', properties: { other: { type: 'string' } } } } } },
    })
    const aux = expectAuxInterface(model.resources[0].auxTypes.find(a => a.name === 'WidgetCreateResult'))
    expect(aux.shape.properties[0].key).toBe('other')
  })

  it('unions the result with void when a JSON 2xx and a bodiless 2xx both exist', () => {
    const model = build({
      '200': { content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' } } } } } },
      '204': {},
    })
    expect(model.client?.resources[0].methods[0].returnType).toEqual({
      kind: 'union',
      members: [{ kind: 'reference', name: 'WidgetCreateResult' }, { kind: 'primitive', primitive: 'void' }],
    })
  })

  it('returns unknown when no JSON schema and no bodiless 2xx are declared', () => {
    const model = build({})
    expect(model.resources).toEqual([])
    expect(model.client?.resources[0].methods[0].returnType).toEqual({ kind: 'primitive', primitive: 'unknown' })
  })
})

describe('client resource grouping', () => {
  it('returns empty resources when there are no curated routes', () => {
    const model = normalizeOpenApi({}, spec({}))
    expect(model.resources).toEqual([])
    expect(model.client?.resources).toEqual([])
  })

  it('groups consecutive methods under each curated resource name', () => {
    const doc = spec({
      paths: {
        '/apps': { get: { responses: {} } },
        '/dynos': { get: { responses: {} } },
      },
    })
    const model = normalizeOpenApi({
      app: { list: { method: 'GET', path: '/apps' } },
      dyno: { list: { method: 'GET', path: '/dynos' } },
    }, doc)
    expect(model.client?.resources.map(r => r.name)).toEqual(['app', 'dyno'])
    expect(model.client?.resources.map(r => r.methods.map(m => m.name))).toEqual([['list'], ['list']])
  })
})

describe('summarizeOpenApiCoverage', () => {
  it('reports request/response schema coverage across matched routes', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          post: {
            requestBody: { content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } } } } } },
            responses: { '201': { content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' } } } } } } },
          },
        },
        '/widgets/{id}': { delete: { responses: { '204': {} } } },
      },
    })
    const stats = summarizeOpenApiCoverage(routes({
      create: { method: 'POST', path: '/widgets', hasRequestBody: true },
      delete: { method: 'DELETE', path: '/widgets/{id}' },
    }), doc)
    expect(stats).toEqual({ total: 2, withOpts: 1, withResult: 1 })
  })

  it('reports zeros when there are no curated routes', () => {
    expect(summarizeOpenApiCoverage({}, spec({}))).toEqual({ total: 0, withOpts: 0, withResult: 0 })
  })

  it('counts a Result|void return as withResult', () => {
    const doc = spec({
      paths: {
        '/widgets': {
          get: {
            responses: {
              '200': { content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string' } } } } } },
              '204': {},
            },
          },
        },
      },
    })
    expect(summarizeOpenApiCoverage(routes({ list: { method: 'GET', path: '/widgets' } }), doc))
      .toEqual({ total: 1, withOpts: 0, withResult: 1 })
  })
})
