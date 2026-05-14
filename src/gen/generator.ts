import { TypeRenderer } from './render.js'
import { normalizeHyperschema } from './normalize-hyperschema.js'
import { emitTypes } from './ts-emit.js'
import type { HerokuSchema } from './schema-types.js'

export const GENERATED_CONTENT_PREAMBLE = `
/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

`.trimStart()

export function generateTypes(schema: HerokuSchema): string {
  if (process.env.HEROKU_TYPES_USE_MODEL === '1') {
    return emitTypes(normalizeHyperschema(schema))
  }

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
