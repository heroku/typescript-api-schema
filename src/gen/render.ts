// TypeRenderer: converts a Heroku hyperschema into TypeScript type definitions.

import { HTTP_METHODS } from './schema-types.js'
import type { HerokuSchema, ResourceDefinition, SchemaNode, SchemaLink, HRefParam, RouteDefinition, HttpMethod } from './schema-types.js'
import { toPascalCase, toCamelCase, formatPropertyKey, renderJSDoc, disambiguateLinkTitles } from './utils.js'

function dedupeUnion(types: string[]): string {
  return [...new Set(types)].join(' | ')
}

function hasCustomProperties(node: SchemaNode | undefined): boolean {
  if (!node) return false
  return !!node.properties && Object.keys(node.properties).length > 0
}

/**
 * True when a resolved targetSchema defines its own properties distinct from
 * the parent resource definition. Callers must resolve any $ref before passing
 * the schema here. Reference equality detects self-references (the parsed JSON
 * reuses the same object when a definition refers to itself).
 */
function hasDistinctResultSchema(
  targetSchema: SchemaNode | undefined,
  resourceDef: ResourceDefinition,
): boolean {
  return hasCustomProperties(targetSchema) && targetSchema !== resourceDef
}

const HREF_PARAM = /\{[^}]*\}/g

function parseRefPath(ref: string): string[] {
  return ref.replace(/^#\//, '').split('/')
}

function isTopLevelResourceRef(refPath: string[]): boolean {
  return refPath.length === 2 && refPath[0] === 'definitions'
}

export class TypeRenderer {
  constructor(private schema: HerokuSchema) {}

  resolveRef(ref: string): SchemaNode {
    const path = parseRefPath(ref)
    let current: unknown = this.schema
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

  /**
   * Resolves a link's targetSchema, following any $ref. Returns the resolved
   * schema node and whether the $ref pointed to a top-level resource
   * (e.g. "#/definitions/app") as opposed to a sub-definition
   * (e.g. "#/definitions/app-webhook/definitions/app_webhook").
   *
   * When the ref targets a top-level resource, the caller should use that
   * resource's interface name directly rather than generating a Result type.
   */
  private resolveTargetSchema(
    targetSchema: SchemaNode | undefined,
  ): { resolved: SchemaNode | undefined; crossResourceRef: string | undefined } {
    if (!targetSchema?.$ref) {
      return { resolved: targetSchema, crossResourceRef: undefined }
    }

    const refParts = parseRefPath(targetSchema.$ref)
    const resolved = this.resolveRef(targetSchema.$ref)

    if (isTopLevelResourceRef(refParts)) {
      return { resolved, crossResourceRef: refParts[1] }
    }

    // Sub-definition ref (e.g. "#/definitions/add-on-webhook/definitions/addon_webhook")
    return { resolved, crossResourceRef: undefined }
  }

  schemaTypeToTS(node: SchemaNode, indent = 0): string {
    if (node.$ref) {
      const refParts = parseRefPath(node.$ref)
      if (isTopLevelResourceRef(refParts)) {
        return toPascalCase(refParts[1])
      }
      // Sub-definition ref → resolve and convert
      const resolved = this.resolveRef(node.$ref)
      return this.schemaTypeToTS(resolved, indent)
    }

    if (node.enum) {
      return node.enum
        .map(v => (typeof v === 'string' ? `'${v}'` : String(v)))
        .join(' | ')
    }

    if (node.anyOf) {
      return dedupeUnion(node.anyOf.map(n => this.schemaTypeToTS(n, indent)))
    }

    if (node.oneOf) {
      return dedupeUnion(node.oneOf.map(n => this.schemaTypeToTS(n, indent)))
    }

    if (node.allOf) {
      return node.allOf.map(n => this.schemaTypeToTS(n, indent)).join(' & ')
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
              const body = this.renderProperties(node.properties, indent + 1, node.required ?? [])
              parts.push(`{\n${body}\n${closePad}}`)
            } else if (node.patternProperties) {
              const values = Object.values(node.patternProperties)
              const valueType = values.length > 0
                ? this.schemaTypeToTS(values[0], indent)
                : 'unknown'
              parts.push(`Record<string, ${valueType}>`)
            } else {
              parts.push('Record<string, unknown>')
            }
            break
          case 'array':
            if (node.items) {
              const itemType = this.schemaTypeToTS(node.items, indent)
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

  renderProperties(
    properties: Record<string, SchemaNode>,
    indent = 1,
    required: string[] = [],
  ): string {
    const pad = '  '.repeat(indent)
    return Object.entries(properties)
      .map(([key, value]) => {
        const tsType = this.schemaTypeToTS(value, indent)
        const optional = !required.includes(key)
        const formattedKey = formatPropertyKey(key)
        const resolved = value.$ref ? this.resolveRef(value.$ref) : value
        const doc = renderJSDoc(resolved.description, pad)
        return `${doc}${pad}${formattedKey}${optional ? '?' : ''}: ${tsType}`
      })
      .join('\n')
  }

  renderResourceInterface(
    name: string,
    definition: ResourceDefinition,
  ): string {
    const interfaceName = toPascalCase(name)
    const doc = renderJSDoc(definition.description, '')

    if (definition.properties) {
      const body = this.renderProperties(definition.properties, 1, definition.required ?? [])
      return `${doc}export interface ${interfaceName} {\n${body}\n}`
    }

    if (definition.type) {
      const node: SchemaNode = {
        type: definition.type,
        patternProperties: definition.patternProperties,
      }
      const tsType = this.schemaTypeToTS(node)
      return `${doc}export type ${interfaceName} = ${tsType}`
    }

    return ''
  }

  private resolveLinks(definition: ResourceDefinition): Array<{ link: SchemaLink; titleKey: string }> {
    if (!definition.links) return []
    const titles = disambiguateLinkTitles(definition.links)
    const resolved: Array<{ link: SchemaLink; titleKey: string }> = []
    for (const link of definition.links) {
      const titleKey = titles.get(link)
      if (!titleKey) continue
      resolved.push({ link, titleKey })
    }
    return resolved
  }

  renderLinkTypes(
    resourceName: string,
    definition: ResourceDefinition,
  ): string[] {
    const results: string[] = []
    for (const { link, titleKey } of this.resolveLinks(definition)) {
      // Generate Opts interface for links with a custom request schema
      if (hasCustomProperties(link.schema)) {
        const optsName = toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts'
        const optsSchema = link.schema!
        const doc = renderJSDoc(link.description, '')
        const body = this.renderProperties(optsSchema.properties!, 1, optsSchema.required ?? [])
        results.push(`${doc}export interface ${optsName} {\n${body}\n}`)
      }

      // Generate Result interface for links with a custom response schema
      const { resolved: resolvedTarget, crossResourceRef } = this.resolveTargetSchema(link.targetSchema)
      if (!crossResourceRef && hasDistinctResultSchema(resolvedTarget, definition)) {
        const resultName = toPascalCase(resourceName) + toPascalCase(titleKey) + 'Result'
        const doc = renderJSDoc(link.description, '')
        const body = this.renderProperties(resolvedTarget!.properties!, 1, resolvedTarget!.required ?? [])
        results.push(`${doc}export interface ${resultName} {\n${body}\n}`)
      }
    }
    return results
  }

  parseHRefParams(href: string): HRefParam[] {
    // Split href into alternating text/placeholder segments to capture context
    const segments = href.split(HREF_PARAM)
    const placeholders = [...href.matchAll(HREF_PARAM)]

    interface RawParam {
      refName: string
      contextName: string
      type: string
    }

    const raw: RawParam[] = []
    for (let i = 0; i < placeholders.length; i++) {
      const match = placeholders[i][0]
      const inner = match.slice(1, -1)
      if (!inner.startsWith('(') || !inner.endsWith(')')) continue
      const encoded = inner.slice(1, -1)
      const decoded = decodeURIComponent(encoded)
      const parts = parseRefPath(decoded)
      const fieldName = parts[parts.length - 1]

      const refName = toCamelCase(parts[parts.length - 3] + '-' + fieldName)

      const precedingText = segments[i] || ''
      const urlSegments = precedingText.split('/').filter(Boolean)
      const precedingSegment = urlSegments[urlSegments.length - 1] || parts[parts.length - 3]
      const contextName = toCamelCase(precedingSegment + '-' + fieldName)

      let type = 'string'
      try {
        const resolved = this.resolveRef('#/' + parts.join('/'))
        type = this.schemaTypeToTS(resolved)
      } catch {
        // fallback to string
      }

      raw.push({ refName, contextName, type })
    }

    const refNameCounts = new Map<string, number>()
    for (const p of raw) {
      refNameCounts.set(p.refName, (refNameCounts.get(p.refName) ?? 0) + 1)
    }

    return raw.map(p => ({
      name: (refNameCounts.get(p.refName) ?? 0) > 1 ? p.contextName : p.refName,
      type: p.type,
    }))
  }

  private linkReturnType(
    resourceName: string,
    definition: ResourceDefinition,
    link: SchemaLink,
    titleKey: string,
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
      return this.schemaTypeToTS(ts)
    }
    const { resolved, crossResourceRef } = this.resolveTargetSchema(ts)
    if (crossResourceRef) {
      return toPascalCase(crossResourceRef)
    }
    if (hasDistinctResultSchema(resolved, definition)) {
      return toPascalCase(resourceName) + toPascalCase(titleKey) + 'Result'
    }
    return toPascalCase(resourceName)
  }

  renderMethodSignatures(
    resourceName: string,
    definition: ResourceDefinition,
  ): string[] {
    const lines: string[] = []
    for (const { link, titleKey } of this.resolveLinks(definition)) {
      const methodName = toCamelCase(titleKey)
      const params: string[] = []

      // Path parameters from href
      if (link.href) {
        for (const p of this.parseHRefParams(link.href)) {
          params.push(`${p.name}: ${p.type}`)
        }
      }

      // Request body parameter
      if (hasCustomProperties(link.schema)) {
        const optsType = toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts'
        params.push(`requestBody: ${optsType}`)
      }

      const returnType = this.linkReturnType(resourceName, definition, link, titleKey)
      const doc = renderJSDoc(link.description, '  ')
      lines.push(`${doc}  ${methodName}(${params.join(', ')}): Promise<${returnType}>`)
    }
    return lines
  }

  renderRouteEntries(
    resourceName: string,
    definition: ResourceDefinition,
  ): Array<{ titleKey: string } & RouteDefinition> {
    const entries: Array<{ titleKey: string } & RouteDefinition> = []
    const SUPPORTED_METHODS: ReadonlySet<string> = new Set(HTTP_METHODS)

    for (const { link, titleKey } of this.resolveLinks(definition)) {
      if (!link.href || !link.method) continue

      const method = link.method.toUpperCase()
      if (!SUPPORTED_METHODS.has(method as HttpMethod)) continue

      const params = this.parseHRefParams(link.href)

      let paramIdx = 0
      const path = link.href.replace(HREF_PARAM, (match) => {
        const inner = match.slice(1, -1)
        if (!inner.startsWith('(') || !inner.endsWith(')')) return match
        return `{${params[paramIdx++].name}}`
      })

      const entry: { titleKey: string } & RouteDefinition = {
        titleKey,
        method: method as HttpMethod,
        path,
      }

      if (hasCustomProperties(link.schema)) {
        entry.hasRequestBody = true
      }

      entries.push(entry)
    }
    return entries
  }

  renderClientInterface(): string {
    const memberLines: string[] = []
    for (const [name, definition] of Object.entries(this.schema.definitions)) {
      if (!definition.links || definition.links.length === 0) continue

      const methods = this.renderMethodSignatures(name, definition)
      if (methods.length === 0) continue

      const resourceCamel = toCamelCase(name)
      const doc = renderJSDoc(definition.description, '  ')
      const body = methods.join('\n')
      memberLines.push(`${doc}  ${resourceCamel}: {\n${body}\n  }`)
    }

    if (memberLines.length === 0) return ''
    return `export interface HerokuClient {\n${memberLines.join('\n')}\n}`
  }
}
