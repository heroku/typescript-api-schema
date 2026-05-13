import { TypeRenderer } from './render.js'
import { HTTP_METHODS, type HerokuSchema, type RouteDefinition } from './schema-types.js'
import { toCamelCase } from './utils.js'

interface ResourceRoutes {
  resource: string
  entries: Array<{ titleKey: string } & RouteDefinition>
}

function collectRoutes(schema: HerokuSchema): ResourceRoutes[] {
  const renderer = new TypeRenderer(schema)
  const out: ResourceRoutes[] = []
  for (const [name, definition] of Object.entries(schema.definitions)) {
    const entries = renderer.renderRouteEntries(name, definition)
    if (entries.length === 0) continue
    out.push({ resource: name, entries })
  }
  return out
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
    methods[toCamelCase(entry.titleKey)] = route
  }
  return `export const ${toCamelCase(resource)} = ${JSON.stringify(methods, null, 2)}`
}

function formatResourceDTS({ resource }: ResourceRoutes): string {
  return `export declare const ${toCamelCase(resource)}: Record<string, RouteDefinition>`
}

export function generateSharedTypesDTS(): string {
  const methodUnion = HTTP_METHODS.map(m => `'${m}'`).join(' | ')
  return `export interface RouteDefinition {\n  method: ${methodUnion}\n  path: string\n  hasRequestBody?: true\n}\n`
}

export function generateRoutesJS(schema: HerokuSchema): string {
  return collectRoutes(schema).map(formatResourceJS).join('\n\n') + '\n'
}

export function generateRoutesDTS(schema: HerokuSchema): string {
  const header = `import type { RouteDefinition } from '../types'`
  const decls = collectRoutes(schema).map(formatResourceDTS)
  return [header, ...decls].join('\n\n') + '\n'
}
