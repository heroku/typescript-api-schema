import { describe, it, expect, vi } from 'vitest'
import {
  pickPrincipalResponse,
  renderType,
  renderObject,
  renderInterfaceBody,
  extractPathParams,
  plan,
  render,
  summarize,
  main,
  type JsonSchema,
  type RouteSchema,
  type RouteDef,
  type MainDeps,
} from './gen-data-types.js'

function schema(s: JsonSchema): JsonSchema {
  return s
}

function routeSchema(over: Partial<RouteSchema> = {}): RouteSchema {
  return {
    request: null,
    responses: {},
    request_example_count: 0,
    response_example_count: 0,
    ...over,
  }
}

describe('pickPrincipalResponse', () => {
  it('prefers 200 over other statuses', () => {
    const r = pickPrincipalResponse({
      '200': schema({ type: 'object', properties: { ok: { type: 'boolean' } } }),
      '201': schema({ type: 'object', properties: { other: { type: 'string' } } }),
    })
    expect(r?.properties?.ok).toBeDefined()
  })

  it('falls back to 201 when no 200', () => {
    const r = pickPrincipalResponse({
      '201': schema({ type: 'object', properties: { created: { type: 'boolean' } } }),
      '500': schema({ type: 'object', properties: { err: { type: 'string' } } }),
    })
    expect(r?.properties?.created).toBeDefined()
  })

  it('falls back to 202 when no 200/201', () => {
    const r = pickPrincipalResponse({
      '202': schema({ type: 'object', properties: { accepted: { type: 'boolean' } } }),
      '500': schema({ type: 'object', properties: { err: { type: 'string' } } }),
    })
    expect(r?.properties?.accepted).toBeDefined()
  })

  it('falls back to first non-empty response when no success status', () => {
    const r = pickPrincipalResponse({
      '404': schema({ type: 'object', properties: { id: { type: 'string' } } }),
    })
    expect(r?.properties?.id).toBeDefined()
  })

  it('returns null when responses is empty', () => {
    expect(pickPrincipalResponse({})).toBeNull()
  })
})

describe('renderType', () => {
  it('renders primitive types', () => {
    expect(renderType({ type: 'string' })).toBe('string')
    expect(renderType({ type: 'number' })).toBe('number')
    expect(renderType({ type: 'integer' })).toBe('number')
    expect(renderType({ type: 'boolean' })).toBe('boolean')
  })

  it('returns "unknown" for null/undefined schema', () => {
    expect(renderType(null)).toBe('unknown')
    expect(renderType(undefined)).toBe('unknown')
  })

  it('returns "unknown" for unrecognized type', () => {
    expect(renderType({ type: 'mystery' as never })).toBe('unknown')
  })

  it('renders arrays with their item type', () => {
    expect(renderType({ type: 'array', items: { type: 'string' } })).toBe('Array<string>')
  })

  it('renders nested object types', () => {
    const out = renderType({
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    })
    expect(out).toContain('id: string')
  })

  it('joins anyOf members with " | "', () => {
    expect(renderType({ anyOf: [{ type: 'string' }, { type: 'number' }] })).toBe('string | number')
  })

  it('treats null in a multi-type union as nullable', () => {
    expect(renderType({ type: ['string', 'null'] })).toBe('string | null')
  })

  it('renders multi-type unions of non-null types', () => {
    expect(renderType({ type: ['string', 'number'] })).toBe('string | number')
  })
})

describe('renderObject', () => {
  it('returns Record<string, unknown> for empty properties', () => {
    expect(renderObject({ type: 'object' }, '  ')).toBe('Record<string, unknown>')
  })

  it('marks non-required properties as optional', () => {
    const out = renderObject({
      type: 'object',
      properties: { name: { type: 'string' }, age: { type: 'integer' } },
      required: ['name'],
    }, '  ')
    expect(out).toContain('name: string')
    expect(out).toContain('age?: number')
  })

  it('quotes non-identifier keys', () => {
    const out = renderObject({
      type: 'object',
      properties: { 'kebab-case': { type: 'string' } },
      required: ['kebab-case'],
    }, '  ')
    expect(out).toContain('"kebab-case": string')
  })
})

describe('renderInterfaceBody', () => {
  it('returns an index signature for empty properties', () => {
    expect(renderInterfaceBody({ type: 'object' })).toBe('  [key: string]: unknown')
  })

  it('emits required and optional members at top-level indent', () => {
    const out = renderInterfaceBody({
      type: 'object',
      properties: { id: { type: 'string' }, note: { type: 'string' } },
      required: ['id'],
    })
    expect(out).toContain('  id: string')
    expect(out).toContain('  note?: string')
  })

  it('quotes non-identifier keys', () => {
    const out = renderInterfaceBody({
      type: 'object',
      properties: { 'has-dashes': { type: 'string' } },
      required: ['has-dashes'],
    })
    expect(out).toContain('"has-dashes": string')
  })
})

describe('extractPathParams', () => {
  it('returns parameters in left-to-right order', () => {
    expect(extractPathParams('/apps/{app}/dynos/{dyno}')).toEqual(['app', 'dyno'])
  })

  it('returns empty array when no params present', () => {
    expect(extractPathParams('/status')).toEqual([])
  })

  it('preserves repeated params in order', () => {
    expect(extractPathParams('/a/{x}/b/{x}')).toEqual(['x', 'x'])
  })
})

describe('plan', () => {
  const routes: Record<string, Record<string, RouteDef>> = {
    app: {
      list: { method: 'GET', path: '/apps' },
      create: { method: 'POST', path: '/apps', hasRequestBody: true },
    },
  }

  it('matches schemas via normalized "VERB /path" keys (curly to colon)', () => {
    const schemas = {
      'GET /apps': routeSchema({ responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } } }),
      'POST /apps': routeSchema({ request: { type: 'object' }, responses: { '201': { type: 'object' } } }),
    }
    const plans = plan(routes, schemas)
    expect(plans).toHaveLength(2)
    expect(plans[0].schema).not.toBeNull()
    expect(plans[1].schema).not.toBeNull()
  })

  it('matches even when schema keys use {param} form by normalizing both sides', () => {
    const r: Record<string, Record<string, RouteDef>> = {
      app: { info: { method: 'GET', path: '/apps/{name}' } },
    }
    const schemas = { 'GET /apps/:name': routeSchema({ responses: { '200': { type: 'object' } } }) }
    const plans = plan(r, schemas)
    expect(plans[0].schema).not.toBeNull()
  })

  it('leaves schema null when there is no matching key', () => {
    const plans = plan(routes, {})
    expect(plans[0].schema).toBeNull()
  })

  it('only sets optsName when hasRequestBody is true', () => {
    const plans = plan(routes, {})
    const list = plans.find(p => p.method === 'list')!
    const create = plans.find(p => p.method === 'create')!
    expect(list.optsName).toBeNull()
    expect(create.optsName).toBe('AppCreateOpts')
  })

  it('always sets a Result name', () => {
    const plans = plan(routes, {})
    expect(plans[0].resultName).toMatch(/Result$/)
  })
})

describe('render', () => {
  it('emits the generated banner', () => {
    const out = render([])
    expect(out).toContain('NOTE: the contents of this file are generated.')
  })

  it('emits HerokuClient and groups by resource', () => {
    const plans = plan(
      {
        app: { list: { method: 'GET', path: '/apps' } },
        dyno: { list: { method: 'GET', path: '/apps/{name}/dynos' } },
      },
      {
        'GET /apps': routeSchema({ responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } } }),
        'GET /apps/:name/dynos': routeSchema({ responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } } }),
      },
    )
    const out = render(plans)
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toMatch(/app: \{[^}]*list\(/)
    expect(out).toMatch(/dyno: \{[^}]*list\(/)
  })

  it('hoists path params to positional string arguments', () => {
    const plans = plan(
      { app: { info: { method: 'GET', path: '/apps/{name}' } } },
      { 'GET /apps/:name': routeSchema({ responses: { '200': { type: 'object' } } }) },
    )
    const out = render(plans)
    expect(out).toMatch(/info\(name: string\)/)
  })

  it('appends requestBody when hasRequestBody and request schema are present', () => {
    const plans = plan(
      { app: { create: { method: 'POST', path: '/apps', hasRequestBody: true } } },
      { 'POST /apps': routeSchema({ request: { type: 'object', properties: { name: { type: 'string' } } }, responses: { '201': { type: 'object' } } }) },
    )
    const out = render(plans)
    expect(out).toContain('export interface AppCreateOpts')
    expect(out).toMatch(/create\(requestBody: AppCreateOpts\)/)
  })

  it('annotates schema-less methods with TODO and uses unknown for return type', () => {
    const plans = plan({ app: { list: { method: 'GET', path: '/apps' } } }, {})
    const out = render(plans)
    expect(out).toContain('TODO: no spec coverage')
    expect(out).toMatch(/list\(\): Promise<unknown>/)
  })

  it('emits each Opts/Result interface only once', () => {
    const plans = plan(
      {
        app: {
          list: { method: 'GET', path: '/apps' },
          // Two methods sharing a target stem would collide; vary the method name to make
          // unique stems and ensure no double-emit per (resource, method) pair.
          listAll: { method: 'GET', path: '/apps/all' },
        },
      },
      {
        'GET /apps': routeSchema({ responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } } }),
        'GET /apps/all': routeSchema({ responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } } }),
      },
    )
    const out = render(plans)
    const matches = out.match(/export interface AppListResult/g) ?? []
    expect(matches.length).toBe(1)
  })
})

describe('summarize', () => {
  it('counts plans by schema coverage dimension', () => {
    const plans = plan(
      {
        app: {
          a: { method: 'GET', path: '/a' },
          b: { method: 'POST', path: '/b', hasRequestBody: true },
          c: { method: 'GET', path: '/c' },
        },
      },
      {
        'GET /a': routeSchema({ responses: { '200': { type: 'object' } } }),
        'POST /b': routeSchema({ request: { type: 'object' }, responses: { '201': { type: 'object' } } }),
        // c: no schema
      },
    )
    const s = summarize(plans)
    expect(s.total).toBe(3)
    expect(s.withSchema).toBe(2)
    expect(s.withOpts).toBe(1)
    expect(s.withResult).toBe(2)
  })
})

describe('main', () => {
  function makeDeps(over: Partial<MainDeps> = {}): MainDeps {
    return {
      routesPath: '/fake/routes.js',
      schemaPath: '/fake/schemas.json',
      outPath: '/fake/types.d.ts',
      readFile: vi.fn().mockReturnValue('{}'),
      writeFile: vi.fn(),
      importRoutes: vi.fn().mockResolvedValue({}),
      log: vi.fn(),
      ...over,
    }
  }

  it('runs the pipeline and writes the rendered output to outPath', async () => {
    const writeFile = vi.fn()
    const deps = makeDeps({
      importRoutes: vi.fn().mockResolvedValue({
        app: { list: { method: 'GET', path: '/apps' } },
      }),
      readFile: vi.fn().mockReturnValue(JSON.stringify({
        'GET /apps': { request: null, responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } }, request_example_count: 0, response_example_count: 0 },
      })),
      writeFile,
    })
    await main(deps)

    expect(writeFile).toHaveBeenCalledTimes(1)
    const [path, content] = writeFile.mock.calls[0]
    expect(path).toBe('/fake/types.d.ts')
    expect(content).toContain('export interface HerokuClient')
    expect(content).toContain('app: {')
  })

  it('skips a routes module\'s default export', async () => {
    const writeFile = vi.fn()
    const deps = makeDeps({
      importRoutes: vi.fn().mockResolvedValue({
        default: { app: { ignored: { method: 'GET', path: '/x' } } },
        app: { list: { method: 'GET', path: '/apps' } },
      }),
      readFile: vi.fn().mockReturnValue('{}'),
      writeFile,
    })
    await main(deps)

    const [, content] = writeFile.mock.calls[0]
    expect(content).not.toContain('ignored')
    expect(content).toContain('list')
  })

  it('logs summary stats after writing', async () => {
    const log = vi.fn()
    const deps = makeDeps({
      importRoutes: vi.fn().mockResolvedValue({ app: { list: { method: 'GET', path: '/apps' } } }),
      readFile: vi.fn().mockReturnValue('{}'),
      log,
    })
    await main(deps)

    const messages = log.mock.calls.map(c => c[0] as string)
    expect(messages.some(m => m.startsWith('Wrote '))).toBe(true)
    expect(messages.some(m => m.includes('Methods total:'))).toBe(true)
  })

  it('does not touch the filesystem when deps are stubbed', async () => {
    const deps = makeDeps()
    await main(deps)
    // No assertion needed beyond "did not throw" — readFile/writeFile/importRoutes are spies.
  })
})
