import { describe, it, expect, vi } from 'vitest'
import {
  generateDataTypes,
  main,
  type MainDeps,
  type RouteDef,
  type RouteSchema,
} from './gen-data-types.js'

function routeSchema(over: Partial<RouteSchema> = {}): RouteSchema {
  return {
    request: null,
    responses: {},
    request_example_count: 0,
    response_example_count: 0,
    ...over,
  }
}

describe('generateDataTypes', () => {
  it('emits the generated banner', () => {
    expect(generateDataTypes({}, {})).toContain('NOTE: the contents of this file are generated.')
  })

  it('emits HerokuClient grouped by resource', () => {
    const out = generateDataTypes(
      {
        app: { list: { method: 'GET', path: '/apps' } },
        dyno: { list: { method: 'GET', path: '/apps/{name}/dynos' } },
      },
      {
        'GET /apps': routeSchema({
          responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } },
        }),
        'GET /apps/:name/dynos': routeSchema({
          responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } },
        }),
      },
    )
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toMatch(/app: \{[^}]*list\(/)
    expect(out).toMatch(/dyno: \{[^}]*list\(/)
  })

  it('hoists path parameters to positional string arguments', () => {
    const out = generateDataTypes(
      { app: { info: { method: 'GET', path: '/apps/{name}' } } },
      { 'GET /apps/:name': routeSchema({ responses: { '200': { type: 'object' } } }) },
    )
    expect(out).toMatch(/info\(name: string\)/)
  })

  it('emits an Opts interface and request body parameter when hasRequestBody is set', () => {
    const out = generateDataTypes(
      { app: { create: { method: 'POST', path: '/apps', hasRequestBody: true } } },
      {
        'POST /apps': routeSchema({
          request: { type: 'object', properties: { name: { type: 'string' } } },
          responses: { '201': { type: 'object' } },
        }),
      },
    )
    expect(out).toContain('export interface AppCreateOpts')
    expect(out).toMatch(/create\(requestBody: AppCreateOpts\)/)
  })

  it('returns Promise<unknown> when no schema is matched', () => {
    const out = generateDataTypes(
      { app: { list: { method: 'GET', path: '/apps' } } },
      {},
    )
    expect(out).toMatch(/list\(\): Promise<unknown>/)
  })

  it('matches schema keys regardless of {param} vs :param form', () => {
    const out = generateDataTypes(
      { app: { info: { method: 'GET', path: '/apps/{name}' } } },
      {
        'GET /apps/:name': routeSchema({
          responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } },
        }),
      },
    )
    expect(out).toContain('export interface AppInfoResult')
  })

  it('emits each Opts/Result interface only once', () => {
    const out = generateDataTypes(
      {
        app: {
          list: { method: 'GET', path: '/apps' },
          listAll: { method: 'GET', path: '/apps/all' },
        },
      },
      {
        'GET /apps': routeSchema({
          responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } },
        }),
        'GET /apps/all': routeSchema({
          responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } },
        }),
      },
    )
    expect((out.match(/export interface AppListResult/g) ?? []).length).toBe(1)
    expect((out.match(/export interface AppListAllResult/g) ?? []).length).toBe(1)
  })

  it('emits empty result schemas as Record<string, unknown> aliases', () => {
    const out = generateDataTypes(
      { app: { ping: { method: 'GET', path: '/ping' } } },
      { 'GET /ping': routeSchema({ responses: { '200': { type: 'object' } } }) },
    )
    expect(out).toContain('export type AppPingResult = Record<string, unknown>')
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

  it('writes the rendered output to outPath', async () => {
    const writeFile = vi.fn()
    const deps = makeDeps({
      importRoutes: vi.fn().mockResolvedValue({
        app: { list: { method: 'GET', path: '/apps' } },
      }),
      readFile: vi.fn().mockReturnValue(JSON.stringify({
        'GET /apps': {
          request: null,
          responses: { '200': { type: 'object', properties: { id: { type: 'string' } } } },
          request_example_count: 0,
          response_example_count: 0,
        },
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

  it("skips a routes module's default export", async () => {
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
