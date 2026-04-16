import { type HerokuSchema, renderResourceInterface, renderLinkTypes, renderClientInterface } from './template.js'

export function generateTypes(schema: HerokuSchema): string {
  const interfaces: string[] = []
  for (const [name, definition] of Object.entries(schema.definitions)) {
    const result = renderResourceInterface(name, definition, schema)
    if (result) {
      interfaces.push(result)
    }
    interfaces.push(...renderLinkTypes(name, definition, schema))
  }

  const client = renderClientInterface(schema)
  if (client) {
    interfaces.push(client)
  }

  return interfaces.join('\n\n') + '\n'
}
