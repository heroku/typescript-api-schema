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
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
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
    return node.anyOf.map(n => schemaTypeToTS(n, schema, indent)).join(' | ')
  }

  if (node.oneOf) {
    return node.oneOf.map(n => schemaTypeToTS(n, schema, indent)).join(' | ')
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

