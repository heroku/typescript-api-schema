import { TypeRenderer, type HerokuSchema } from './template.js'

export function generateTypes(schema: HerokuSchema): string {
  const renderer = new TypeRenderer(schema)
  const interfaces: string[] = []
  for (const [name, definition] of Object.entries(schema.definitions)) {
    const result = renderer.renderResourceInterface(name, definition)
    if (result) {
      interfaces.push(result)
    }
    interfaces.push(...renderer.renderLinkTypes(name, definition))
  }

  const client = renderer.renderClientInterface()
  if (client) {
    interfaces.push(client)
  }

  return interfaces.join('\n\n') + '\n'
}
