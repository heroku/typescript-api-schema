import { TypeRenderer, HTTP_METHODS, toCamelCase, type HerokuSchema } from './template.js'

export function generateSharedTypesDTS(): string {
  const methodUnion = HTTP_METHODS.map(m => `'${m}'`).join(' | ')
  return `export interface RouteDefinition {\n  method: ${methodUnion}\n  path: string\n  hasRequestBody?: true\n}\n`
}

export function generateRoutesJS(schema: HerokuSchema): string {
  const renderer = new TypeRenderer(schema)
  const exports: string[] = []

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

    const resourceName = toCamelCase(name)
    exports.push(`export const ${resourceName} = ${JSON.stringify(methods, null, 2)}`)
  }

  return exports.join('\n\n') + '\n'
}

export function generateRoutesDTS(schema: HerokuSchema): string {
  const renderer = new TypeRenderer(schema)
  const declarations: string[] = [
    `import type { RouteDefinition } from '../types'`,
  ]

  for (const [name, definition] of Object.entries(schema.definitions)) {
    const entries = renderer.renderRouteEntries(name, definition)
    if (entries.length === 0) continue
    declarations.push(`export declare const ${toCamelCase(name)}: Record<string, RouteDefinition>`)
  }

  return declarations.join('\n\n') + '\n'
}
