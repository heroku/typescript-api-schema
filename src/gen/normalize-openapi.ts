// OpenAPI 3.0.1 spec + curated route (data/routes.ts) grouping -> TypesModel normalizer for the `data` variant.

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
import type {
  OpenApiDocument,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiPathItem,
  OpenApiReference,
  OpenApiRequestBodyOrRef,
  OpenApiResponseOrRef,
  OpenApiSchema,
  OpenApiSchemaOrRef,
} from './openapi-types.js'
import type { HttpMethod, RouteDefinition } from './schema-types.js'
import { toPascalCase } from './utils.js'

const SCHEMA_REF_PREFIX = '#/components/schemas/'
const PARAM_RE = /\{(\w+)\}/g
const HTTP_TO_OPENAPI = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
} as const satisfies Record<HttpMethod, keyof OpenApiPathItem>
// OAS 3.0.1 media type keys may be a type or a range (`*/*`,
// `application/*`). This pipeline only reads `application/json`.
const JSON_MEDIA_TYPE = 'application/json'

function isRef(value: object): value is OpenApiReference {
  return '$ref' in value
}

// Narrows `T | Reference` to T. Parameter, requestBody, and response 
// $refs — including `#/components/parameters/…`, requestBodies, and 
// responses — have no lookup table (OpenApiDocument only models 
// components.schemas), so those throw an error.
function requireNonRef<T extends object>(value: T | OpenApiReference): T {
  if (isRef(value)) {
    throw new Error(
      `Unsupported $ref (only ${SCHEMA_REF_PREFIX}... targets are resolved): ${value.$ref}`,
    )
  }
  return value
}

// Follows a $ref chain to the first non-$ref node (a Schema Object).
function resolveSchema(spec: OpenApiDocument, schema: OpenApiSchemaOrRef): OpenApiSchema {
  function resolveSchemaRef(ref: string): OpenApiSchemaOrRef {
    if (!ref.startsWith(SCHEMA_REF_PREFIX)) {
      throw new Error(`Unsupported $ref target (expected ${SCHEMA_REF_PREFIX}...): ${ref}`)
    }
    const name = ref.slice(SCHEMA_REF_PREFIX.length)
    const resolved = spec.components?.schemas?.[name]
    if (!resolved) throw new Error(`Could not resolve $ref: ${ref}`)
    return resolved
  }

  if (!isRef(schema)) return schema
  return resolveSchema(spec, resolveSchemaRef(schema.$ref))
}

function extractPathParams(path: string): string[] {
  const params: string[] = []
  for (const m of path.matchAll(PARAM_RE)) params.push(m[1])
  return params
}

// Looks up a route from 'data/routes.ts' in the OpenAPI spec. 
// Returns the path item and operation if found.
function lookupRouteInSpec(
  spec: OpenApiDocument,
  route: RouteDefinition,
): { pathItem: OpenApiPathItem, operation: OpenApiOperation } {
  const pathItem = spec.paths[route.path]
  const operation = pathItem?.[HTTP_TO_OPENAPI[route.method]]
  if (!operation) {
    throw new Error(
      `No spec match for ${route.method} ${route.path} — check src/data/routes.ts against the data-api OpenAPI spec`,
    )
  }
  return { pathItem, operation }
}

function responseSchema(response: OpenApiResponseOrRef | undefined): OpenApiSchemaOrRef | undefined {
  if (!response) return undefined
  return requireNonRef(response).content?.[JSON_MEDIA_TYPE]?.schema
}

function requestBodySchema(requestBody: OpenApiRequestBodyOrRef | undefined): OpenApiSchemaOrRef | undefined {
  if (!requestBody) return undefined
  return requireNonRef(requestBody).content[JSON_MEDIA_TYPE]?.schema
}

// Returns the query parameters declared on the Path Item Object and/or
// Operation Object, merged into one list.
//
// Parameters declared on the Path Item Object apply to every operation on
// that path and are merged with the operation's own `parameters`; an
// operation-level parameter with the same name+in overrides the path-item
// parameter of the same name+in (OAS 3.0.1 Path Item Object).
function mergedQueryParams(pathItem: OpenApiPathItem, operation: OpenApiOperation): OpenApiParameter[] {
  const merged = new Map<string, OpenApiParameter>()
  for (const p of pathItem.parameters ?? []) {
    const param = requireNonRef(p)
    merged.set(`${param.in}:${param.name}`, param)
  }
  for (const p of operation?.parameters ?? []) {
    const param = requireNonRef(p)
    merged.set(`${param.in}:${param.name}`, param)
  }
  return [...merged.values()].filter(p => p.in === 'query')
}

function pickPrincipalResponseSchema(
  responses: Record<string, OpenApiResponseOrRef> | undefined,
): OpenApiSchemaOrRef | null {
  if (!responses) return null
  const twoXX = Object.keys(responses).filter(s => /^2\d\d$/.test(s))
  if (twoXX.length > 0) {
    for (const status of twoXX.sort()) {
      const schema = responseSchema(responses[status])
      if (schema) return schema
    }
  }
  else {
    for (const status of Object.keys(responses).sort()) {
      const schema = responseSchema(responses[status])
      if (schema) return schema
    }
  }
  return null
}

function hasBodilessSuccess(responses: Record<string, OpenApiResponseOrRef> | undefined): boolean {
  if (!responses) return false
  return Object.entries(responses).some(
    ([status, response]) => /^2\d\d$/.test(status) && !responseSchema(response),
  )
}

function withNull(core: TypeRef): TypeRef {
  return { kind: 'union', members: [core, { kind: 'reference', name: 'null' }] }
}

function schemaToTypeRef(spec: OpenApiDocument, schema: OpenApiSchemaOrRef | undefined): TypeRef {
  if (!schema) return { kind: 'primitive', primitive: 'unknown' }

  const resolvedSchema = resolveSchema(spec, schema)
  let core: TypeRef

  if (resolvedSchema.enum) {
    core = enumToTypeRef(resolvedSchema.enum)
  } else if (resolvedSchema.oneOf || resolvedSchema.anyOf) {
    const members: TypeRef[] = (resolvedSchema.oneOf ?? resolvedSchema.anyOf)!.map(s => schemaToTypeRef(spec, s))
    core = members.length === 1 ? members[0] : { kind: 'union', members }
  } else if (resolvedSchema.allOf) {
    const members: TypeRef[] = resolvedSchema.allOf.map(s => schemaToTypeRef(spec, s))
    core = members.length === 1 ? members[0] : { kind: 'intersection', members }
  }
  else if (resolvedSchema.type) {
    core = typeToTypeRef(spec, resolvedSchema.type, resolvedSchema)
  }
  else if (resolvedSchema.properties) {
    core = objectToTypeRef(spec, resolvedSchema)
  }
  else {
    core = { kind: 'primitive', primitive: 'unknown' }
  }


  return resolvedSchema.nullable ? withNull(core) : core
}

function enumToTypeRef(values: unknown[]): TypeRef {
  const members: TypeRef[] = values.map(value => {
    if (value === null) {
      return { kind: 'reference', name: 'null' }
    }
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
      return { kind: 'literal', value }
    }
    return { kind: 'primitive', primitive: 'unknown' }
  })
  return members.length === 1 ? members[0] : { kind: 'union', members }
}

function typeToTypeRef(spec: OpenApiDocument, type: string, schema: OpenApiSchema): TypeRef {
  switch (type) {
    case 'string':
      return { kind: 'primitive', primitive: 'string' }
    case 'integer':
    case 'number':
      return { kind: 'primitive', primitive: 'number' }
    case 'boolean':
      return { kind: 'primitive', primitive: 'boolean' }
    case 'array':
      return { kind: 'array', items: schemaToTypeRef(spec, schema.items) }
    case 'object':
      return objectToTypeRef(spec, schema)
    default:
      return { kind: 'primitive', primitive: 'unknown' }
  }
}

function objectToTypeRef(spec: OpenApiDocument, schema: OpenApiSchema): TypeRef {
  const props = schema.properties ?? {}
  if (Object.keys(props).length === 0) {
    const extra = schema.additionalProperties
    const valueType = extra !== null && typeof extra === 'object'
      ? schemaToTypeRef(spec, extra)
      : { kind: 'primitive', primitive: 'unknown' } as TypeRef
    return { kind: 'record', valueType }
  }
  return { kind: 'object', shape: buildObjectShape(spec, schema) }
}

function buildObjectShape(spec: OpenApiDocument, schema: OpenApiSchema): ObjectShape {
  const props = schema.properties ?? {}
  const required = new Set(schema.required ?? [])
  const properties: PropertyModel[] = Object.entries(props).map(([key, value]) => {
    const resolvedSchema = resolveSchema(spec, value)
    return {
      key,
      description: resolvedSchema.description,
      type: schemaToTypeRef(spec, resolvedSchema),
      required: required.has(key),
    }
  })
  return { properties }
}

function buildAuxType(spec: OpenApiDocument, name: string, schema: OpenApiSchemaOrRef): AuxType {
  const resolvedSchema = resolveSchema(spec, schema)
  const description = resolvedSchema.description
  const props = resolvedSchema.properties ?? {}

  if (Object.keys(props).length > 0) {
    return { kind: 'interface', name, description, shape: buildObjectShape(spec, resolvedSchema) }
  }

  return { kind: 'alias', name, description, type: schemaToTypeRef(spec, resolvedSchema) }
}

interface MethodPlan {
  resource: string   // routes.ts export key (`database`)
  method: string   // client method key (`info`)
  route: RouteDefinition
  operation: OpenApiOperation
  queryParams: OpenApiParameter[]
  optsName: string | null
  resultName: string
}

function buildPlans(
  routesByResource: Record<string, Record<string, RouteDefinition>>,
  spec: OpenApiDocument,
): MethodPlan[] {
  const plans: MethodPlan[] = []
  for (const [resource, methods] of Object.entries(routesByResource)) {
    for (const [method, route] of Object.entries(methods)) {
      const { pathItem, operation } = lookupRouteInSpec(spec, route)

      const specHasRequestBody = Boolean(requestBodySchema(operation.requestBody))
      const curatedHasRequestBody = Boolean(route.hasRequestBody)
      if (specHasRequestBody !== curatedHasRequestBody) {
        throw new Error(
          `hasRequestBody mismatch for ${route.method} ${route.path}: ` +
            `routes.ts says hasRequestBody=${curatedHasRequestBody}, but the spec ` +
            `${specHasRequestBody ? 'declares' : 'does not declare'} a requestBody — fix src/data/routes.ts`,
        )
      }

      const queryParams = mergedQueryParams(pathItem, operation)
      const specQuery = queryParams.map(p => p.name).sort()
      const curatedQuery = (route.query ?? []).slice().sort()
      if (JSON.stringify(specQuery) !== JSON.stringify(curatedQuery)) {
        throw new Error(
          `query param mismatch for ${route.method} ${route.path}: ` +
            `routes.ts declares query=[${curatedQuery.join(', ')}], but the spec declares ` +
            `query=[${specQuery.join(', ')}] — fix src/data/routes.ts`,
        )
      }

      const stem = `${toPascalCase(resource)}${toPascalCase(method)}`
      plans.push({
        resource,
        method,
        route,
        operation,
        queryParams,
        optsName: route.hasRequestBody ? `${stem}Opts` : null,
        resultName: `${stem}Result`,
      })
    }
  }
  return plans
}

export function normalizeOpenApi(
  routesByResource: Record<string, Record<string, RouteDefinition>>,
  spec: OpenApiDocument,
): TypesModel {
  const plans = buildPlans(routesByResource, spec)

  const optsEmitted = new Set<string>()
  const resultEmitted = new Set<string>()
  const auxTypes: AuxType[] = []
  const clientResources: ClientResourceModel[] = []

  let current: ClientResourceModel | undefined

  for (const p of plans) {
    if (p.optsName && !optsEmitted.has(p.optsName)) {
      const schema = requestBodySchema(p.operation.requestBody)
      if (schema) {
        auxTypes.push(buildAuxType(spec, p.optsName, schema))
        optsEmitted.add(p.optsName)
      }
    }

    if (!resultEmitted.has(p.resultName)) {
      const schema = pickPrincipalResponseSchema(p.operation.responses)
      if (schema) {
        auxTypes.push(buildAuxType(spec, p.resultName, schema))
        resultEmitted.add(p.resultName)
      }
    }

    if (!current || current.name !== p.resource) {
      current = { name: p.resource, methods: [] }
      clientResources.push(current)
    }
    current.methods.push(buildMethod(spec, p, resultEmitted, optsEmitted))
  }

  // The data variant has no resource-level shape. Pack all aux types onto a
  // single synthetic resource — the emitter walks resources to emit aux
  // types in order.
  const resources: ResourceModel[] = auxTypes.length > 0
    ? [{ name: '__data__', auxTypes }]
    : []

  return {
    resources,
    client: { resources: clientResources },
  }
}

function buildMethod(
  spec: OpenApiDocument,
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
  if (p.route.query && p.route.query.length > 0) {
    const queryParamsByName = new Map(p.queryParams.map(param => [param.name, param]))
    params.push({
      name: 'query',
      type: {
        kind: 'object',
        shape: {
          properties: p.route.query.map(key => {
            const param = queryParamsByName.get(key)
            return {
              key,
              type: param?.schema ? schemaToTypeRef(spec, param.schema) : { kind: 'primitive', primitive: 'string' },
              required: Boolean(param?.required),
            }
          }),
        },
      },
    })
  }

  const hasResult = resultEmitted.has(p.resultName)
  const hasNoContent = hasBodilessSuccess(p.operation.responses)
  const returnType: TypeRef = hasResult && hasNoContent
    ? {
        kind: 'union',
        members: [
          { kind: 'reference', name: p.resultName },
          { kind: 'primitive', primitive: 'void' },
        ],
      }
    : hasResult
      ? { kind: 'reference', name: p.resultName }
      : hasNoContent
        ? { kind: 'primitive', primitive: 'void' }
        : { kind: 'primitive', primitive: 'unknown' }

  return { name: p.method, params, returnType }
}

export interface OpenApiCoverageStats {
  total: number
  withOpts: number
  withResult: number
}

export function summarizeOpenApiCoverage(
  routesByResource: Record<string, Record<string, RouteDefinition>>,
  spec: OpenApiDocument
): OpenApiCoverageStats {
  const plans = buildPlans(routesByResource, spec)
  let total = 0, withOpts = 0, withResult = 0
  for (const p of plans) {
    total += 1
    if (p.optsName && requestBodySchema(p.operation.requestBody)) withOpts += 1
    if (pickPrincipalResponseSchema(p.operation.responses)) withResult += 1
  }
  return { total, withOpts, withResult }
}
