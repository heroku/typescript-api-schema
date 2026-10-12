import { extractRouteEntries } from './normalize-hyperschema.js'
import { HTTP_METHODS, type HerokuSchema, type RouteDefinition } from './schema-types.js'
import { toCamelCase } from './utils.js'

interface ResourceRoutes {
  resource: string
  entries: Array<{ titleKey: string } & RouteDefinition>
}

function formatResourceJS({ resource, entries }: ResourceRoutes): string {
  const methods: Record<string, Record<string, unknown>> = {}
  for (const entry of entries) {
    const route: Record<string, unknown> = {
      method: entry.method,
      path: entry.path,
    }
    if (entry.hasRequestBody) {
      route.hasRequestBody = true
    }
    if (entry.query) {
      route.query = entry.query
    }
    const key = toCamelCase(entry.titleKey)
    // Fail loudly on a method-key collision rather than silently overwriting.
    // The route table is an object keyed by method name, so two links that
    // reduce to the same camelCased key (same title + same HTTP method on
    // different paths) would drop one route here while the type emitter — whose
    // methods are an array — keeps both as overloads. That mismatch ships a
    // typed method with no runtime route (see the stack/generation/payment/usage
    // de-collisions in patch-hyperschema.ts). Any new such collision must be
    // disambiguated there; this guard makes it a build failure, not a silent gap.
    if (Object.hasOwn(methods, key)) {
      const existing = methods[key] as { path?: string }
      throw new Error(
        `Duplicate route method '${key}' on resource '${resource}': ` +
          `'${existing.path}' and '${entry.path}' collide. Two links share a title and ` +
          `HTTP method — disambiguate them in patch-hyperschema.ts.`,
      )
    }
    methods[key] = route
  }
  return `export const ${toCamelCase(resource)} = ${JSON.stringify(methods, null, 2)}`
}

function formatResourceDTS(resource: string): string {
  return `export declare const ${toCamelCase(resource)}: Record<string, RouteDefinition>`
}

export function generateSharedTypesDTS(): string {
  const methodUnion = HTTP_METHODS.map(m => `'${m}'`).join(' | ')
  return `export interface RouteDefinition {\n  method: ${methodUnion}\n  path: string\n  hasRequestBody?: true\n  query?: string[]\n}\n`
}

export function generateRoutesJS(schema: HerokuSchema): string {
  return extractRouteEntries(schema).map(formatResourceJS).join('\n\n') + '\n'
}

export function generateRoutesDTSForResources(resources: string[]): string {
  const header = `import type { RouteDefinition } from '../types'`
  const decls = resources.map(formatResourceDTS)
  return [header, ...decls].join('\n\n') + '\n'
}

export function generateRoutesDTS(schema: HerokuSchema): string {
  return generateRoutesDTSForResources(extractRouteEntries(schema).map(r => r.resource))
}
