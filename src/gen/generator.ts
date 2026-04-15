import { type HerokuSchema, renderResourceInterface } from './template.js'

export function generateTypes(schema: HerokuSchema): string {
  const interfaces: string[] = []
  for (const [name, definition] of Object.entries(schema.definitions)) {
    const result = renderResourceInterface(name, definition, schema)
    if (result) {
      interfaces.push(result)
    }
  }
  return interfaces.join('\n\n') + '\n'
}
