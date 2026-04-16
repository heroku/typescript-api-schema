import { type HerokuSchema, type ResourceDefinition, renderResourceInterface, renderLinkTypes, renderClientInterface } from './template.js'

export class DuplicateLinkTitleError extends Error {
  constructor(resourceName: string, title: string) {
    super(`duplicate link title "${title}" in resource "${resourceName}"`)
  }
}

function validateUniqueLinkTitles(name: string, definition: ResourceDefinition): void {
  if (!definition.links) return
  const seen = new Set<string>()
  for (const link of definition.links) {
    if (!link.title) continue
    const lower = link.title.toLowerCase()
    if (seen.has(lower)) {
      throw new DuplicateLinkTitleError(name, link.title)
    }
    seen.add(lower)
  }
}

export function generateTypes(schema: HerokuSchema): string {
  const interfaces: string[] = []
  for (const [name, definition] of Object.entries(schema.definitions)) {
    validateUniqueLinkTitles(name, definition)

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
