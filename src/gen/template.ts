// This file exports template functions necessary for generating Typescript type definition output.

// --- Schema type definitions ---

export interface HerokuSchema {
  definitions: Record<string, ResourceDefinition>
}

export interface ResourceDefinition {
  description?: string
  title?: string
  type?: string[]
  stability?: string
  strictProperties?: boolean
  required?: string[]
  definitions?: Record<string, SchemaNode>
  properties?: Record<string, SchemaNode>
  links?: SchemaLink[]
}

export interface SchemaNode {
  $ref?: string
  type?: string[]
  enum?: (string | number | boolean)[]
  anyOf?: SchemaNode[]
  oneOf?: SchemaNode[]
  allOf?: SchemaNode[]
  properties?: Record<string, SchemaNode>
  required?: string[]
  strictProperties?: boolean
  items?: SchemaNode
  patternProperties?: Record<string, SchemaNode>
  additionalProperties?: boolean
  description?: string
  example?: unknown
  format?: string
  readOnly?: boolean
  default?: unknown
}

export interface SchemaLink {
  title?: string
  description?: string
  href?: string
  method?: string
  rel?: string
  schema?: SchemaNode
  targetSchema?: SchemaNode
}

// --- Utilities ---

export function toPascalCase(name: string): string {
  return name
    .split(/[-.\s/:_{}()]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export function toCamelCase(name: string): string {
  const pascal = toPascalCase(name)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

const VALID_IDENTIFIER = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/

export function formatPropertyKey(key: string): string {
  return VALID_IDENTIFIER.test(key) ? key : `'${key.replace(/'/g, "\\'")}'`
}

export function renderJSDoc(description: string | undefined, indent: string): string {
  if (!description) return ''
  if (!description.includes('\n')) {
    return `${indent}/** ${description} */\n`
  }
  const lines = description.split('\n')
  return `${indent}/**\n${lines.map(l => `${indent} * ${l}`).join('\n')}\n${indent} */\n`
}

function dedupeUnion(types: string[]): string {
  return [...new Set(types)].join(' | ')
}

// --- Core template functions ---

export function resolveRef(schema: HerokuSchema, ref: string): SchemaNode {
  const path = ref.replace(/^#\//, '').split('/')
  let current: unknown = schema
  for (const segment of path) {
    if (current === null || typeof current !== 'object') {
      throw new Error(`Could not resolve $ref: ${ref}`)
    }
    current = (current as Record<string, unknown>)[segment]
  }
  if (current === undefined) {
    throw new Error(`Could not resolve $ref: ${ref}`)
  }
  return current as SchemaNode
}

export function schemaTypeToTS(node: SchemaNode, schema: HerokuSchema, indent = 0): string {
  if (node.$ref) {
    const refParts = node.$ref.replace(/^#\//, '').split('/')
    // Top-level resource ref (e.g. "#/definitions/account") → use interface name
    if (refParts.length === 2 && refParts[0] === 'definitions') {
      return toPascalCase(refParts[1])
    }
    // Sub-definition ref → resolve and convert
    const resolved = resolveRef(schema, node.$ref)
    return schemaTypeToTS(resolved, schema, indent)
  }

  if (node.enum) {
    return node.enum
      .map(v => (typeof v === 'string' ? `'${v}'` : String(v)))
      .join(' | ')
  }

  if (node.anyOf) {
    return dedupeUnion(node.anyOf.map(n => schemaTypeToTS(n, schema, indent)))
  }

  if (node.oneOf) {
    return dedupeUnion(node.oneOf.map(n => schemaTypeToTS(n, schema, indent)))
  }

  if (node.allOf) {
    return node.allOf.map(n => schemaTypeToTS(n, schema, indent)).join(' & ')
  }

  if (node.type) {
    const parts: string[] = []
    const hasNull = node.type.includes('null')

    for (const t of node.type) {
      if (t === 'null') continue
      switch (t) {
        case 'string':
          parts.push('string')
          break
        case 'boolean':
          parts.push('boolean')
          break
        case 'integer':
        case 'number':
          parts.push('number')
          break
        case 'object':
          if (node.properties) {
            const closePad = '  '.repeat(indent)
            const body = renderProperties(node.properties, schema, indent + 1, node.required ?? [])
            parts.push(`{\n${body}\n${closePad}}`)
          } else if (node.patternProperties) {
            const values = Object.values(node.patternProperties)
            const valueType = values.length > 0
              ? schemaTypeToTS(values[0], schema, indent)
              : 'unknown'
            parts.push(`Record<string, ${valueType}>`)
          } else {
            parts.push('Record<string, unknown>')
          }
          break
        case 'array':
          if (node.items) {
            const itemType = schemaTypeToTS(node.items, schema, indent)
            parts.push(`Array<${itemType}>`)
          } else {
            parts.push('unknown[]')
          }
          break
        default:
          parts.push('unknown')
      }
    }

    if (hasNull) {
      parts.push('null')
    }

    return parts.join(' | ')
  }

  return 'unknown'
}

export function renderProperties(
  properties: Record<string, SchemaNode>,
  schema: HerokuSchema,
  indent = 1,
  required: string[] = [],
): string {
  const pad = '  '.repeat(indent)
  return Object.entries(properties)
    .map(([key, value]) => {
      const tsType = schemaTypeToTS(value, schema, indent)
      const optional = !required.includes(key)
      const formattedKey = formatPropertyKey(key)
      const resolved = value.$ref ? resolveRef(schema, value.$ref) : value
      const doc = renderJSDoc(resolved.description, pad)
      return `${doc}${pad}${formattedKey}${optional ? '?' : ''}: ${tsType}`
    })
    .join('\n')
}

export function renderResourceInterface(
  name: string,
  definition: ResourceDefinition,
  schema: HerokuSchema,
): string {
  if (!definition.properties) {
    return ''
  }
  const interfaceName = toPascalCase(name)
  const doc = renderJSDoc(definition.description, '')
  const body = renderProperties(definition.properties, schema, 1, definition.required ?? [])
  return `${doc}export interface ${interfaceName} {\n${body}\n}`
}

export function disambiguateLinkTitles(links: SchemaLink[]): Map<SchemaLink, string> {
  // Count titles (case-insensitive)
  const counts = new Map<string, number>()
  for (const link of links) {
    if (!link.title) continue
    const lower = link.title.toLowerCase()
    counts.set(lower, (counts.get(lower) ?? 0) + 1)
  }

  // Assign disambiguated suffixes: append method when title collides
  const result = new Map<SchemaLink, string>()
  for (const link of links) {
    if (!link.title) continue
    const lower = link.title.toLowerCase()
    if ((counts.get(lower) ?? 0) > 1 && link.method) {
      result.set(link, link.title + '-' + link.method.toLowerCase())
    } else {
      result.set(link, link.title)
    }
  }
  return result
}

function hasCustomProperties(node: SchemaNode | undefined): boolean {
  if (!node) return false
  return !!node.properties && Object.keys(node.properties).length > 0
}

export function renderLinkTypes(
  resourceName: string,
  definition: ResourceDefinition,
  schema: HerokuSchema,
): string[] {
  if (!definition.links) return []

  const titles = disambiguateLinkTitles(definition.links)
  const results: string[] = []
  for (const link of definition.links) {
    const titleKey = titles.get(link)
    if (!titleKey) continue

    // Generate Opts interface for links with a custom request schema
    if (hasCustomProperties(link.schema)) {
      const optsName = toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts'
      const optsSchema = link.schema!
      const doc = renderJSDoc(link.description, '')
      const body = renderProperties(optsSchema.properties!, schema, 1, optsSchema.required ?? [])
      results.push(`${doc}export interface ${optsName} {\n${body}\n}`)
    }

    // Generate Result interface for links with a custom response schema
    if (hasCustomProperties(link.targetSchema) && link.targetSchema !== definition) {
      const resultName = toPascalCase(resourceName) + toPascalCase(titleKey) + 'Result'
      const resultSchema = link.targetSchema!
      const doc = renderJSDoc(link.description, '')
      const body = renderProperties(resultSchema.properties!, schema, 1, resultSchema.required ?? [])
      results.push(`${doc}export interface ${resultName} {\n${body}\n}`)
    }
  }
  return results
}

// --- Href parsing and method signature generation ---

const HREF_PARAM = /\{[^}]*\}/g

export interface HRefParam {
  name: string
  type: string
}

export function parseHRefParams(href: string, schema: HerokuSchema): HRefParam[] {
  const params: HRefParam[] = []
  for (const match of href.matchAll(HREF_PARAM)) {
    const raw = match[0]
    // Format: {(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)} or {(#/definitions/...)}
    const inner = raw.slice(1, -1) // strip { }
    if (!inner.startsWith('(') || !inner.endsWith(')')) continue
    const encoded = inner.slice(1, -1) // strip ( )
    const decoded = decodeURIComponent(encoded)
    const parts = decoded.replace(/^#\//, '').split('/')

    // Derive parameter name from schema path: resource-field → camelCase
    const name = toCamelCase(parts[parts.length - 3] + '-' + parts[parts.length - 1])

    // Resolve the referenced schema to get the type
    let type = 'string'
    try {
      const resolved = resolveRef(schema, '#/' + parts.join('/'))
      type = schemaTypeToTS(resolved, schema)
    } catch {
      // fallback to string
    }

    params.push({ name, type })
  }
  return params
}

function linkReturnType(
  resourceName: string,
  definition: ResourceDefinition,
  link: SchemaLink,
  titleKey: string,
  schema: HerokuSchema,
): string {
  if (!link.targetSchema) {
    // Default: returns the resource type itself
    if (link.rel === 'instances') {
      return toPascalCase(resourceName) + '[]'
    }
    return toPascalCase(resourceName)
  }

  const ts = link.targetSchema
  if (ts.type?.includes('null') && ts.type.length === 1) {
    return 'void'
  }
  if (ts.type?.includes('array') && ts.items) {
    return schemaTypeToTS(ts, schema)
  }
  if (hasCustomProperties(ts) && ts !== definition) {
    return toPascalCase(resourceName) + toPascalCase(titleKey) + 'Result'
  }
  return toPascalCase(resourceName)
}

export function renderMethodSignatures(
  resourceName: string,
  definition: ResourceDefinition,
  schema: HerokuSchema,
): string[] {
  if (!definition.links) return []

  const titles = disambiguateLinkTitles(definition.links)
  const lines: string[] = []
  for (const link of definition.links) {
    const titleKey = titles.get(link)
    if (!titleKey) continue
    if (link.rel === 'self') continue

    const methodName = toCamelCase(titleKey)
    const params: string[] = []

    // Path parameters from href
    if (link.href) {
      for (const p of parseHRefParams(link.href, schema)) {
        params.push(`${p.name}: ${p.type}`)
      }
    }

    // Request body parameter
    if (hasCustomProperties(link.schema)) {
      const optsType = toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts'
      params.push(`requestBody: ${optsType}`)
    }

    const returnType = linkReturnType(resourceName, definition, link, titleKey, schema)
    const doc = renderJSDoc(link.description, '  ')
    lines.push(`${doc}  ${methodName}(${params.join(', ')}): Promise<${returnType}>`)
  }
  return lines
}

export function renderClientInterface(
  schema: HerokuSchema,
): string {
  const memberLines: string[] = []
  for (const [name, definition] of Object.entries(schema.definitions)) {
    if (!definition.links || definition.links.length === 0) continue

    const methods = renderMethodSignatures(name, definition, schema)
    if (methods.length === 0) continue

    const resourcePascal = toPascalCase(name)
    const resourceCamel = toCamelCase(name)
    const doc = renderJSDoc(definition.description, '  ')
    const body = methods.join('\n')
    memberLines.push(`${doc}  ${resourceCamel}: {\n${body}\n  }`)
  }

  if (memberLines.length === 0) return ''
  return `export interface HerokuClient {\n${memberLines.join('\n')}\n}`
}

