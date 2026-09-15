import { describe, it, expect, vi } from 'vitest'
import {
  generateDataTypes,
  main,
  type MainDeps,
} from './gen-data-types.js'
import type { OpenApiDocument, OpenApiPathItem } from './gen/openapi-types.js'

function spec(paths: Record<string, OpenApiPathItem>): OpenApiDocument {
  return { paths, components: { schemas: {} } }
}

function json(schema: object) {
  return { content: { 'application/json': { schema } } }
}

describe('generateDataTypes', () => {
  it('emits the generated banner', () => {
    expect(generateDataTypes({}, spec({}))).toContain('NOTE: the contents of this file are generated.')
  })

  it('emits HerokuClient grouped by resource', () => {
    const out = generateDataTypes(
      {
        app: { list: { method: 'GET', path: '/apps' } },
        dyno: { list: { method: 'GET', path: '/apps/{name}/dynos' } },
      },
      spec({
        '/apps': { get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } } },
        '/apps/{name}/dynos': { get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } } },
      }),
    )
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toMatch(/app: \{[^}]*list\(/)
    expect(out).toMatch(/dyno: \{[^}]*list\(/)
  })

  it('hoists path parameters to positional string arguments', () => {
    const out = generateDataTypes(
      { app: { info: { method: 'GET', path: '/apps/{name}' } } },
      spec({
        '/apps/{name}': { get: { responses: { '200': json({ type: 'object' }) } } },
      }),
    )
    expect(out).toMatch(/info\(name: string\)/)
  })

  it('emits an Opts interface and request body parameter when hasRequestBody is set', () => {
    const out = generateDataTypes(
      { app: { create: { method: 'POST', path: '/apps', hasRequestBody: true } } },
      spec({
        '/apps': {
          post: {
            requestBody: json({ type: 'object', properties: { name: { type: 'string' } } }),
            responses: { '201': json({ type: 'object' }) },
          },
        },
      }),
    )
    expect(out).toContain('export interface AppCreateOpts')
    expect(out).toMatch(/create\(requestBody: AppCreateOpts\)/)
  })

  it('throws when a curated route has no matching spec path', () => {
    expect(() => generateDataTypes(
      { app: { list: { method: 'GET', path: '/apps' } } },
      spec({}),
    )).toThrow(/No spec match for GET \/apps/)
  })

  it('includes void when a route has both a JSON response and no-content response', () => {
    const out = generateDataTypes(
      { app: { create: { method: 'POST', path: '/apps' } } },
      spec({
        '/apps': {
          post: {
            responses: {
              '201': json({ type: 'object', properties: { id: { type: 'string' } } }),
              '204': {},
            },
          },
        },
      }),
    )
    expect(out).toMatch(/create\(\): Promise<AppCreateResult \| void>/)
  })

  it('returns Promise<void> when a route has only a no-content response', () => {
    const out = generateDataTypes(
      { app: { destroy: { method: 'DELETE', path: '/apps/{name}' } } },
      spec({
        '/apps/{name}': { delete: { responses: { '204': {} } } },
      }),
    )
    expect(out).toMatch(/destroy\(name: string\): Promise<void>/)
    expect(out).not.toMatch(/destroy\(name: string\): Promise<unknown>/)
  })

  it('does not use an error response as the result for a no-content route', () => {
    const out = generateDataTypes(
      { app: { destroy: { method: 'DELETE', path: '/apps/{name}' } } },
      spec({
        '/apps/{name}': {
          delete: {
            responses: {
              '204': {},
              '400': json({ type: 'object', properties: { message: { type: 'string' } } }),
            },
          },
        },
      }),
    )
    expect(out).toMatch(/destroy\(name: string\): Promise<void>/)
    expect(out).not.toContain('AppDestroyResult')
  })

  it('preserves an error-only response as the result when no 2xx is declared', () => {
    const out = generateDataTypes(
      { app: { fail: { method: 'GET', path: '/apps/fail' } } },
      spec({
        '/apps/fail': {
          get: {
            responses: {
              '404': json({ type: 'object', properties: { message: { type: 'string' } } }),
            },
          },
        },
      }),
    )
    expect(out).toContain('export interface AppFailResult')
    expect(out).toMatch(/fail\(\): Promise<AppFailResult>/)
  })

  it('uses other successful JSON responses as the principal result', () => {
    const out = generateDataTypes(
      { app: { partial: { method: 'GET', path: '/apps/partial' } } },
      spec({
        '/apps/partial': {
          get: {
            responses: {
              '204': {},
              '206': json({ type: 'object', properties: { id: { type: 'string' } } }),
              '400': json({ type: 'object', properties: { message: { type: 'string' } } }),
            },
          },
        },
      }),
    )
    expect(out).toContain('export interface AppPartialResult')
    expect(out).toMatch(/partial\(\): Promise<AppPartialResult \| void>/)
  })

  it('uses a 206-only response as the principal result without adding void', () => {
    const out = generateDataTypes(
      { app: { partial: { method: 'GET', path: '/apps/partial' } } },
      spec({
        '/apps/partial': {
          get: {
            responses: {
              '206': json({ type: 'object', properties: { id: { type: 'string' } } }),
            },
          },
        },
      }),
    )
    expect(out).toContain('export interface AppPartialResult')
    expect(out).toMatch(/partial\(\): Promise<AppPartialResult>/)
    expect(out).not.toMatch(/partial\(\): Promise<AppPartialResult \| void>/)
  })

  it('emits each Opts/Result interface only once', () => {
    const out = generateDataTypes(
      {
        app: {
          list: { method: 'GET', path: '/apps' },
          listAll: { method: 'GET', path: '/apps/all' },
        },
      },
      spec({
        '/apps': { get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } } },
        '/apps/all': { get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } } },
      }),
    )
    expect((out.match(/export interface AppListResult/g) ?? []).length).toBe(1)
    expect((out.match(/export interface AppListAllResult/g) ?? []).length).toBe(1)
  })

  it('emits empty result schemas as Record<string, unknown> aliases', () => {
    const out = generateDataTypes(
      { app: { ping: { method: 'GET', path: '/ping' } } },
      spec({
        '/ping': { get: { responses: { '200': json({ type: 'object' }) } } },
      }),
    )
    expect(out).toContain('export type AppPingResult = Record<string, unknown>')
  })
})

describe('additionalProperties', () => {
  it('emits a typed Record for a property-less object with typed additionalProperties', () => {
    const out = generateDataTypes(
      { app: { series: { method: 'GET', path: '/series' } } },
      spec({
        '/series': {
          get: {
            responses: {
              '200': json({
                type: 'object',
                required: ['data'],
                properties: {
                  data: {
                    type: 'object',
                    additionalProperties: { type: 'array', items: { type: 'number', nullable: true } },
                  },
                },
              }),
            },
          },
        },
      }),
    )
    expect(out).toMatch(/data: Record<string, Array<number \| null>>/)
  })

  it('still falls back to Record<string, unknown> when additionalProperties is absent', () => {
    const out = generateDataTypes(
      { app: { blob: { method: 'GET', path: '/blob' } } },
      spec({
        '/blob': { get: { responses: { '200': json({ type: 'object' }) } } },
      }),
    )
    expect(out).toContain('export type AppBlobResult = Record<string, unknown>')
  })
})

describe('query params', () => {
  it('emits a trailing query object param for routes declaring query', () => {
    const out = generateDataTypes(
      {
        routerMetric: {
          latency: { method: 'GET', path: '/apps/{app}/router-metrics/latency', query: ['date', 'process_type'] },
        },
      },
      spec({
        '/apps/{app}/router-metrics/latency': {
          get: {
            parameters: [
              { name: 'date', in: 'query', schema: { type: 'string' } },
              { name: 'process_type', in: 'query', schema: { type: 'string' } },
            ],
            responses: { '200': json({ type: 'object', properties: { step: { type: 'string' } } }) },
          },
        },
      }),
    )
    expect(out).toMatch(/latency\(app: string, query: \{[^}]*date\?: string[^}]*process_type\?: string[^}]*\}\): Promise</)
  })
})

describe('main', () => {
  function makeDeps(over: Partial<MainDeps> = {}): MainDeps {
    return {
      routesPath: '/fake/routes.ts',
      outPath: '/fake/types.d.ts',
      fetchSpec: vi.fn().mockResolvedValue(spec({})),
      writeFile: vi.fn(),
      importRoutes: vi.fn().mockResolvedValue({}),
      emitTypedSource: vi.fn().mockReturnValue({
        jsPath: '/fake/dist/data/routes.js',
        diagnostics: [],
      }),
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
      fetchSpec: vi.fn().mockResolvedValue(spec({
        '/apps': { get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } } },
      })),
      writeFile,
    })
    await main(deps)

    const typesCall = writeFile.mock.calls.find((c: unknown[]) => c[0] === '/fake/types.d.ts')
    expect(typesCall).toBeDefined()
    const content = typesCall![1] as string
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
      fetchSpec: vi.fn().mockResolvedValue(spec({
        '/apps': { get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } } },
      })),
      writeFile,
    })
    await main(deps)

    const typesCall = writeFile.mock.calls.find((c: unknown[]) => c[0] === '/fake/types.d.ts')
    expect(typesCall).toBeDefined()
    const content = typesCall![1] as string
    expect(content).not.toContain('ignored')
    expect(content).toContain('list')
  })

  it('logs summary stats after writing', async () => {
    const log = vi.fn()
    const deps = makeDeps({
      importRoutes: vi.fn().mockResolvedValue({
        app: {
          list: { method: 'GET', path: '/apps' },
          create: { method: 'POST', path: '/apps', hasRequestBody: true },
        },
      }),
      fetchSpec: vi.fn().mockResolvedValue(spec({
        '/apps': {
          get: { responses: { '200': json({ type: 'object', properties: { id: { type: 'string' } } }) } },
          post: {
            requestBody: json({ type: 'object', properties: { name: { type: 'string' } } }),
            responses: { '201': json({ type: 'object', properties: { id: { type: 'string' } } }) },
          },
        },
      })),
      log,
    })
    await main(deps)

    const messages = log.mock.calls.map(c => c[0] as string)
    expect(messages.some(m => m.startsWith('Wrote '))).toBe(true)
    expect(messages.some(m => m.includes('Methods total:        2'))).toBe(true)
    expect(messages.some(m => m.includes('With request schema:  1'))).toBe(true)
    expect(messages.some(m => m.includes('With response schema: 2'))).toBe(true)
  })

  it('does not touch the filesystem when deps are stubbed', async () => {
    const deps = makeDeps()
    await main(deps)
    // No assertion needed beyond "did not throw" — writeFile/importRoutes are spies.
  })

  it("defaults routesPath to the typed source under src/", async () => {
    const importRoutes = vi.fn().mockResolvedValue({})
    await main({
      outPath: '/fake/types.d.ts',
      fetchSpec: vi.fn().mockResolvedValue(spec({})),
      writeFile: vi.fn(),
      importRoutes,
      emitTypedSource: vi.fn().mockReturnValue({
        jsPath: '/fake/dist/data/routes.js',
        diagnostics: [],
      }),
      log: vi.fn(),
    })
    expect(importRoutes).toHaveBeenCalledWith(expect.stringMatching(/src\/data\/routes\.ts$/))
  })

  it("emits dist/data/routes.js from the typed source", async () => {
    const emitTypedSource = vi.fn().mockReturnValue({
      jsPath: '/fake/dist/data/routes.js',
      diagnostics: [],
    })
    const log = vi.fn()
    await main(makeDeps({ emitTypedSource, log }))
    expect(emitTypedSource).toHaveBeenCalledWith(
      expect.objectContaining({
        sourcePath: expect.stringMatching(/routes\.ts$/),
        banner: expect.stringContaining('NOTE: the contents of this file are generated'),
      }),
    )
    const messages = log.mock.calls.map(c => c[0] as string)
    expect(messages.some(m => m.includes('routes.js'))).toBe(true)
  })

  it("writes routes.d.ts with Record<string, RouteDefinition> declarations for each curated resource", async () => {
    const writeFile = vi.fn()
    await main(makeDeps({
      importRoutes: vi.fn().mockResolvedValue({
        transfer: { list: { method: 'GET', path: '/x' } },
        backup: { create: { method: 'POST', path: '/y', hasRequestBody: true } },
      }),
      fetchSpec: vi.fn().mockResolvedValue(spec({
        '/x': { get: { responses: {} } },
        '/y': { post: { requestBody: json({ type: 'object' }), responses: {} } },
      })),
      writeFile,
    }))
    const dtsCall = writeFile.mock.calls.find((c: unknown[]) => /routes\.d\.ts$/.test(c[0] as string))
    expect(dtsCall).toBeDefined()
    const content = dtsCall![1] as string
    expect(content).toContain('NOTE: the contents of this file are generated')
    expect(content).toContain(`import type { RouteDefinition } from '../types'`)
    expect(content).toContain('export declare const transfer: Record<string, RouteDefinition>')
    expect(content).toContain('export declare const backup: Record<string, RouteDefinition>')
  })

  it("aborts when emitTypedSource returns diagnostics", async () => {
    const emitTypedSource = vi.fn().mockReturnValue({
      jsPath: '/fake/dist/data/routes.js',
      diagnostics: [{ messageText: 'boom', category: 1, code: 1, file: undefined, start: undefined, length: undefined }],
    })
    const writeFile = vi.fn()
    await expect(
      main(makeDeps({ emitTypedSource, writeFile })),
    ).rejects.toThrow(/diagnostic/i)
    expect(writeFile).not.toHaveBeenCalled()
  })
})
