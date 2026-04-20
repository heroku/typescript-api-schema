import { TypeRenderer, toCamelCase, type HerokuSchema } from './template.js'

export function generateRoutesJS(schema: HerokuSchema): string {
  const renderer = new TypeRenderer(schema)
  const registry: Record<string, Record<string, Record<string, unknown>>> = {}

  for (const [name, definition] of Object.entries(schema.definitions)) {
    const entries = renderer.renderRouteEntries(name, definition)
    if (entries.length === 0) continue

    const methods: Record<string, Record<string, unknown>> = {}
    for (const entry of entries) {
      const methodName = toCamelCase(entry.titleKey)
      const route: Record<string, unknown> = {
        method: entry.method,
        path: entry.path,
      }
      if (entry.hasRequestBody) {
        route.hasRequestBody = true
      }
      methods[methodName] = route
    }

    registry[toCamelCase(name)] = methods
  }

  return `export const routes = ${JSON.stringify(registry, null, 2)}\n`
}

export function generateRoutesDTS(): string {
  return `export interface RouteDefinition {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path: string
  hasRequestBody?: true
}

export declare const routes: Record<string, Record<string, RouteDefinition>>
`
}
