// JSON Schema (from spec traffic) → TypesModel normalizer for the data
// variant. Curated route grouping is preserved; resource-level shapes are
// not (the data pipeline doesn't carry them — its inputs are per-route).

import type {
  AuxType,
  ClientResourceModel,
  MethodModel,
  ObjectShape,
  ParamModel,
  PropertyModel,
  ResourceModel,
  TypeRef,
  TypesModel,
} from './model.js'

export interface RouteDef {
  method: string
  path: string
  hasRequestBody?: true
}

export interface JsonSchema {
  type?: string | string[]
  properties?: Record<string, JsonSchema>
  required?: string[]
  items?: JsonSchema
  anyOf?: JsonSchema[]
}

export interface RouteSchema {
  request: JsonSchema | null
  responses: Record<string, JsonSchema>
  request_example_count: number
  response_example_count: number
}

const PARAM_RE = /\{(\w+)\}/g

function normalizeRoute(key: string): string {
  return key.replace(PARAM_RE, ':$1')
}

function toPascal(s: string): string {
  return s
    .replace(/(?:^|[_-])([a-z])/g, (_, c: string) => c.toUpperCase())
    .replace(/^./, c => c.toUpperCase())
}

function extractPathParams(path: string): string[] {
  const params: string[] = []
  for (const m of path.matchAll(PARAM_RE)) params.push(m[1])
  return params
}

export function pickPrincipalResponse(
  responses: Record<string, JsonSchema>,
): JsonSchema | null {
  for (const status of ['200', '201', '202']) {
    if (responses[status]) return responses[status]
  }
  for (const v of Object.values(responses)) {
    if (v) return v
  }
  return null
}

function schemaToTypeRef(schema: JsonSchema | null | undefined): TypeRef {
  if (!schema) return { kind: 'primitive', primitive: 'unknown' }
  if (schema.anyOf) {
    const members = schema.anyOf.map(schemaToTypeRef)
    return members.length === 1 ? members[0] : { kind: 'union', members }
  }

  const types = Array.isArray(schema.type)
    ? schema.type
    : schema.type ? [schema.type] : []
  const nonNull = types.filter(t => t !== 'null')
  const nullable = types.includes('null')

  let core: TypeRef
  if (nonNull.length > 1) {
    core = {
      kind: 'union',
      members: nonNull.map(t => schemaToTypeRef({ ...schema, type: t })),
    }
  } else {
    core = primitiveSchemaToTypeRef(nonNull[0], schema)
  }

  if (!nullable) return core
  return { kind: 'union', members: [core, { kind: 'reference', name: 'null' }] }
}

function primitiveSchemaToTypeRef(t: string | undefined, schema: JsonSchema): TypeRef {
  switch (t) {
    case 'string':
      return { kind: 'primitive', primitive: 'string' }
    case 'integer':
    case 'number':
      return { kind: 'primitive', primitive: 'number' }
    case 'boolean':
      return { kind: 'primitive', primitive: 'boolean' }
    case 'array':
      return { kind: 'array', items: schemaToTypeRef(schema.items) }
    case 'object':
      return objectSchemaToTypeRef(schema)
    default:
      return { kind: 'primitive', primitive: 'unknown' }
  }
}

function objectSchemaToTypeRef(schema: JsonSchema): TypeRef {
  const props = schema.properties ?? {}
  const keys = Object.keys(props)
  if (keys.length === 0) {
    return { kind: 'record', valueType: { kind: 'primitive', primitive: 'unknown' } }
  }
  return { kind: 'object', shape: buildObjectShape(schema) }
}

function buildObjectShape(schema: JsonSchema): ObjectShape {
  const props = schema.properties ?? {}
  const required = new Set(schema.required ?? [])
  const properties: PropertyModel[] = Object.entries(props).map(([key, value]) => ({
    key,
    type: schemaToTypeRef(value),
    required: required.has(key),
  }))
  return { properties }
}

// Schemas without any properties become `Record<string, unknown>` aliases
// rather than empty interfaces. The legacy data renderer accomplished this
// by inserting a `[key: string]: unknown` index signature; the alias is
// equivalent at the type level and consistent with how nested empty objects
// are rendered.
function buildAuxType(name: string, schema: JsonSchema): AuxType {
  const props = schema.properties ?? {}
  if (Object.keys(props).length === 0) {
    return {
      kind: 'alias',
      name,
      type: { kind: 'record', valueType: { kind: 'primitive', primitive: 'unknown' } },
    }
  }
  return { kind: 'interface', name, shape: buildObjectShape(schema) }
}

interface MethodPlan {
  resource: string
  method: string
  route: RouteDef
  schema: RouteSchema | null
  optsName: string | null
  resultName: string
}

function buildPlans(
  routesByResource: Record<string, Record<string, RouteDef>>,
  schemas: Record<string, RouteSchema>,
): MethodPlan[] {
  const indexed: Record<string, RouteSchema> = {}
  for (const [k, v] of Object.entries(schemas)) {
    indexed[normalizeRoute(k)] = v
  }
  const plans: MethodPlan[] = []
  for (const [resource, methods] of Object.entries(routesByResource)) {
    for (const [method, route] of Object.entries(methods)) {
      const key = normalizeRoute(`${route.method} ${route.path}`)
      const stem = `${toPascal(resource)}${toPascal(method)}`
      plans.push({
        resource,
        method,
        route,
        schema: indexed[key] ?? null,
        optsName: route.hasRequestBody ? `${stem}Opts` : null,
        resultName: `${stem}Result`,
      })
    }
  }
  return plans
}

export function normalizeData(
  routesByResource: Record<string, Record<string, RouteDef>>,
  schemas: Record<string, RouteSchema>,
): TypesModel {
  const plans = buildPlans(routesByResource, schemas)

  // Emit Opts/Result aux types in the order they're encountered, deduped.
  const optsEmitted = new Set<string>()
  const resultEmitted = new Set<string>()
  const auxTypes: AuxType[] = []

  for (const p of plans) {
    if (p.optsName && p.schema?.request && !optsEmitted.has(p.optsName)) {
      auxTypes.push(buildAuxType(p.optsName, p.schema.request))
      optsEmitted.add(p.optsName)
    }
    if (!resultEmitted.has(p.resultName)) {
      const principal = p.schema ? pickPrincipalResponse(p.schema.responses) : null
      if (principal) {
        auxTypes.push(buildAuxType(p.resultName, principal))
        resultEmitted.add(p.resultName)
      }
    }
  }

  // The data variant has no resource-level shape. Pack all aux types onto a
  // single synthetic resource — the emitter walks resources to emit aux
  // types in order.
  const resources: ResourceModel[] = auxTypes.length > 0
    ? [{ name: '__data__', auxTypes }]
    : []

  // Group methods by resource for HerokuClient.
  const byResource = new Map<string, MethodPlan[]>()
  for (const p of plans) {
    if (!byResource.has(p.resource)) byResource.set(p.resource, [])
    byResource.get(p.resource)!.push(p)
  }

  const clientResources: ClientResourceModel[] = []
  for (const [resource, methods] of byResource) {
    clientResources.push({
      name: resource,
      methods: methods.map(p => buildMethod(p, resultEmitted, optsEmitted)),
    })
  }

  return {
    resources,
    client: { resources: clientResources },
  }
}

function buildMethod(
  p: MethodPlan,
  resultEmitted: Set<string>,
  optsEmitted: Set<string>,
): MethodModel {
  const params: ParamModel[] = extractPathParams(p.route.path).map(name => ({
    name,
    type: { kind: 'primitive', primitive: 'string' },
  }))
  if (p.optsName && optsEmitted.has(p.optsName)) {
    params.push({ name: 'requestBody', type: { kind: 'reference', name: p.optsName } })
  }
  const returnType: TypeRef = resultEmitted.has(p.resultName)
    ? { kind: 'reference', name: p.resultName }
    : { kind: 'primitive', primitive: 'unknown' }
  return { name: p.method, params, returnType }
}
