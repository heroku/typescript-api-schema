// Hyperschema → TypesModel normalizer. Owns interpretation of the Heroku
// hyperschema ($ref resolution, link disambiguation, hRef param parsing,
// targetSchema cross-resource detection) and emits an intermediate model
// for the shared emitter.

import { HTTP_METHODS } from './schema-types.js'
import type {
  HerokuSchema,
  ResourceDefinition,
  SchemaNode,
  SchemaLink,
  HttpMethod,
} from './schema-types.js'
import { toPascalCase, toCamelCase, disambiguateLinkTitles } from './utils.js'
import type {
  AuxType,
  ClientResourceModel,
  MethodModel,
  ObjectShape,
  ParamModel,
  PropertyModel,
  ResourceModel,
  ResourceShape,
  TypeRef,
  TypesModel,
} from './model.js'

const HREF_PARAM = /\{[^}]*\}/g

function parseRefPath(ref: string): string[] {
  return ref.replace(/^#\//, '').split('/')
}

function isTopLevelResourceRef(refPath: string[]): boolean {
  return refPath.length === 2 && refPath[0] === 'definitions'
}

function hasCustomProperties(node: SchemaNode | undefined): boolean {
  if (!node) return false
  return !!node.properties && Object.keys(node.properties).length > 0
}

function hasDistinctResultSchema(
  targetSchema: SchemaNode | undefined,
  resourceDef: ResourceDefinition,
): boolean {
  return hasCustomProperties(targetSchema) && targetSchema !== resourceDef
}

function dedupe(refs: TypeRef[]): TypeRef[] {
  // Mirrors render.ts dedupeUnion: textual de-duplication preserving order.
  // Two TypeRefs are equivalent if they render identically.
  const seen = new Set<string>()
  const result: TypeRef[] = []
  for (const ref of refs) {
    const key = JSON.stringify(ref)
    if (seen.has(key)) continue
    seen.add(key)
    result.push(ref)
  }
  return result
}

class HyperschemaNormalizer {
  constructor(private schema: HerokuSchema) {}

  normalize(): TypesModel {
    const resources: ResourceModel[] = []
    const clientResources: ClientResourceModel[] = []

    for (const [name, definition] of Object.entries(this.schema.definitions)) {
      const resource = this.buildResource(name, definition)
      if (resource) resources.push(resource)

      const clientResource = this.buildClientResource(name, definition)
      if (clientResource) clientResources.push(clientResource)
    }

    return {
      resources,
      client: { resources: clientResources },
    }
  }

  private buildResource(name: string, definition: ResourceDefinition): ResourceModel | null {
    const auxTypes = this.buildAuxTypes(name, definition)
    const shape = this.buildResourceShape(definition)
    if (!shape && auxTypes.length === 0) return null

    return {
      name: toPascalCase(name),
      description: definition.description,
      shape: shape ?? undefined,
      auxTypes,
    }
  }

  private buildResourceShape(definition: ResourceDefinition): ResourceShape | undefined {
    if (definition.properties) {
      return {
        kind: 'interface',
        shape: this.buildObjectShape(definition.properties, definition.required ?? []),
      }
    }

    if (definition.type) {
      const node: SchemaNode = {
        type: definition.type,
        patternProperties: definition.patternProperties,
      }
      return { kind: 'alias', type: this.schemaToTypeRef(node) }
    }

    return undefined
  }

  private buildAuxTypes(resourceName: string, definition: ResourceDefinition): AuxType[] {
    const auxTypes: AuxType[] = []
    for (const { link, titleKey } of this.resolveLinks(definition)) {
      if (hasCustomProperties(link.schema)) {
        auxTypes.push({
          name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts',
          description: link.description,
          shape: this.buildObjectShape(
            link.schema!.properties!,
            link.schema!.required ?? [],
          ),
        })
      }

      const { resolved, crossResourceRef } = this.resolveTargetSchema(link.targetSchema)
      if (!crossResourceRef && hasDistinctResultSchema(resolved, definition)) {
        auxTypes.push({
          name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Result',
          description: link.description,
          shape: this.buildObjectShape(resolved!.properties!, resolved!.required ?? []),
        })
      }
    }
    return auxTypes
  }

  private buildClientResource(
    name: string,
    definition: ResourceDefinition,
  ): ClientResourceModel | null {
    if (!definition.links || definition.links.length === 0) return null
    const methods = this.buildMethods(name, definition)
    if (methods.length === 0) return null
    return {
      name: toCamelCase(name),
      description: definition.description,
      methods,
    }
  }

  private buildMethods(
    resourceName: string,
    definition: ResourceDefinition,
  ): MethodModel[] {
    const methods: MethodModel[] = []
    for (const { link, titleKey } of this.resolveLinks(definition)) {
      const params: ParamModel[] = []

      if (link.href) {
        for (const p of this.parseHRefParams(link.href)) {
          params.push(p)
        }
      }

      if (hasCustomProperties(link.schema)) {
        params.push({
          name: 'requestBody',
          type: {
            kind: 'reference',
            name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Opts',
          },
        })
      }

      methods.push({
        name: toCamelCase(titleKey),
        description: link.description,
        params,
        returnType: this.linkReturnType(resourceName, definition, link, titleKey),
      })
    }
    return methods
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

  private buildObjectShape(
    properties: Record<string, SchemaNode>,
    required: string[],
  ): ObjectShape {
    const props: PropertyModel[] = Object.entries(properties).map(([key, value]) => {
      const resolved = value.$ref ? this.resolveRef(value.$ref) : value
      return {
        key,
        description: resolved.description,
        type: this.schemaToTypeRef(value),
        required: required.includes(key),
      }
    })
    return { properties: props }
  }

  private schemaToTypeRef(node: SchemaNode): TypeRef {
    if (node.$ref) {
      const refParts = parseRefPath(node.$ref)
      if (isTopLevelResourceRef(refParts)) {
        return { kind: 'reference', name: toPascalCase(refParts[1]) }
      }
      const resolved = this.resolveRef(node.$ref)
      return this.schemaToTypeRef(resolved)
    }

    if (node.enum) {
      const members: TypeRef[] = node.enum.map(v => {
        if (typeof v === 'string') return { kind: 'literal', value: v }
        if (typeof v === 'number') return { kind: 'literal', value: v }
        if (typeof v === 'boolean') return { kind: 'literal', value: v }
        return { kind: 'reference', name: String(v) }
      })
      return members.length === 1 ? members[0] : { kind: 'union', members }
    }

    if (node.anyOf) {
      const members = dedupe(node.anyOf.map(n => this.schemaToTypeRef(n)))
      return members.length === 1 ? members[0] : { kind: 'union', members }
    }

    if (node.oneOf) {
      const members = dedupe(node.oneOf.map(n => this.schemaToTypeRef(n)))
      return members.length === 1 ? members[0] : { kind: 'union', members }
    }

    if (node.allOf) {
      const members = node.allOf.map(n => this.schemaToTypeRef(n))
      return members.length === 1 ? members[0] : { kind: 'intersection', members }
    }

    if (node.type) {
      const parts: TypeRef[] = []
      const hasNull = node.type.includes('null')
      for (const t of node.type) {
        if (t === 'null') continue
        parts.push(this.primitiveTypeToTypeRef(t, node))
      }
      if (hasNull) {
        parts.push({ kind: 'reference', name: 'null' })
      }
      return parts.length === 1 ? parts[0] : { kind: 'union', members: parts }
    }

    return { kind: 'primitive', primitive: 'unknown' }
  }

  private primitiveTypeToTypeRef(t: string, node: SchemaNode): TypeRef {
    switch (t) {
      case 'string':
        return { kind: 'primitive', primitive: 'string' }
      case 'boolean':
        return { kind: 'primitive', primitive: 'boolean' }
      case 'integer':
      case 'number':
        return { kind: 'primitive', primitive: 'number' }
      case 'object':
        if (node.properties) {
          return {
            kind: 'object',
            shape: this.buildObjectShape(node.properties, node.required ?? []),
          }
        }
        if (node.patternProperties) {
          const values = Object.values(node.patternProperties)
          const valueType = values.length > 0
            ? this.schemaToTypeRef(values[0])
            : { kind: 'primitive', primitive: 'unknown' } as TypeRef
          return { kind: 'record', valueType }
        }
        return { kind: 'record', valueType: { kind: 'primitive', primitive: 'unknown' } }
      case 'array':
        if (node.items) {
          return { kind: 'array', items: this.schemaToTypeRef(node.items) }
        }
        return { kind: 'array' }
      default:
        return { kind: 'primitive', primitive: 'unknown' }
    }
  }

  private resolveRef(ref: string): SchemaNode {
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
    return { resolved, crossResourceRef: undefined }
  }

  private parseHRefParams(href: string): ParamModel[] {
    const segments = href.split(HREF_PARAM)
    const placeholders = [...href.matchAll(HREF_PARAM)]

    interface RawParam {
      refName: string
      contextName: string
      type: TypeRef
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

      let type: TypeRef = { kind: 'primitive', primitive: 'string' }
      try {
        const resolved = this.resolveRef('#/' + parts.join('/'))
        type = this.schemaToTypeRef(resolved)
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
  ): TypeRef {
    if (!link.targetSchema) {
      if (link.rel === 'instances') {
        return {
          kind: 'array',
          items: { kind: 'reference', name: toPascalCase(resourceName) },
          style: 'brackets',
        }
      }
      return { kind: 'reference', name: toPascalCase(resourceName) }
    }

    const ts = link.targetSchema
    if (ts.type?.includes('null') && ts.type.length === 1) {
      return { kind: 'primitive', primitive: 'void' }
    }
    if (ts.type?.includes('array') && ts.items) {
      return this.schemaToTypeRef(ts)
    }

    const { resolved, crossResourceRef } = this.resolveTargetSchema(ts)
    if (crossResourceRef) {
      return { kind: 'reference', name: toPascalCase(crossResourceRef) }
    }
    if (hasDistinctResultSchema(resolved, definition)) {
      return {
        kind: 'reference',
        name: toPascalCase(resourceName) + toPascalCase(titleKey) + 'Result',
      }
    }
    return { kind: 'reference', name: toPascalCase(resourceName) }
  }
}

export function normalizeHyperschema(schema: HerokuSchema): TypesModel {
  return new HyperschemaNormalizer(schema).normalize()
}

// HTTP_METHODS re-exported here to keep the HRefParam-aware parsing logic
// colocated. Used by route-generator integration in PR-2.
export { HTTP_METHODS }
export type { HttpMethod }
