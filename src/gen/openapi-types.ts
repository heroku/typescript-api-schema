// Structural types for the subset of OpenAPI 3.0.1 objects normalize-openapi.ts
// reads. (Reference: https://spec.openapis.org/oas/v3.0.1)

// OpenAPI Object, the document root. `paths` is REQUIRED;
// `components` is optional. Deliberately omitted: openapi, info, servers,
// security, tags, externalDocs, and every components.* map except
// `schemas` (the only one normalize-openapi.ts's $ref resolution reads).
export interface OpenApiDocument {
  paths: Record<string, OpenApiPathItem>
  components?: {
    schemas?: Record<string, OpenApiSchemaOrRef>
  }
}

// Path Item Object. `parameters` applies to every operation on the
// path and is merged with each operation's own `parameters`. Deliberately
// omitted: `$ref`, summary, description, servers, and head/options/trace
// (curated routes only use GET/POST/PUT/PATCH/DELETE).
export interface OpenApiPathItem {
  get?: OpenApiOperation
  post?: OpenApiOperation
  put?: OpenApiOperation
  patch?: OpenApiOperation
  delete?: OpenApiOperation
  parameters?: OpenApiParameterOrRef[]
}

// Operation Object. `responses` is REQUIRED; `parameters` and `requestBody`
// are optional. Deliberately omitted: tags, summary, description, externalDocs,
// operationId, callbacks, deprecated, security, servers.
export interface OpenApiOperation {
  parameters?: OpenApiParameterOrRef[]
  requestBody?: OpenApiRequestBodyOrRef
  responses: Record<string, OpenApiResponseOrRef>
}

// Parameter Object. `name` and `in` are REQUIRED; `required` is *conditionally*
// mandatory-true when `in: path`.
//
// Deliberately omitted: description, deprecated, allowEmptyValue, style,
// explode, allowReserved, content (the content-based alternative to
// schema+style), example, examples.
export interface OpenApiParameter {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
  schema?: OpenApiSchemaOrRef
}

// Request Body Object. `content` is REQUIRED. Deliberately
// omitted: description.
export interface OpenApiRequestBody {
  required?: boolean
  content: Record<string, OpenApiMediaType>
}

// Response Object. `content` is optional. Deliberately
// omitted: `description`, `headers` and `links`.
export interface OpenApiResponse {
  content?: Record<string, OpenApiMediaType>
}

// Media Type Object. `schema` is optional. Deliberately
// omitted: example, examples, encoding.
export interface OpenApiMediaType {
  schema?: OpenApiSchemaOrRef
}

// Schema Object. `type` MUST be a single string (not an array). `allOf`,
// `oneOf`, `anyOf`, `items`, `properties`, and `additionalProperties` are
// JSON-Schema-derived fields the OpenAPI spec explicitly adjusts. A Schema
// Object as a whole may be replaced by a Reference Object (`OpenApiSchemaOrRef`).
//
// Deliberately omitted: title, multipleOf, maximum/minimum (+exclusive variants),
// maxLength, minLength, pattern, maxItems, minItems, uniqueItems, maxProperties,
// minProperties, not, discriminator, readOnly, writeOnly, xml, externalDocs,
// example, deprecated, default, format.
export interface OpenApiSchema {
  type?: string
  enum?: unknown[]
  oneOf?: OpenApiSchemaOrRef[]
  allOf?: OpenApiSchemaOrRef[]
  anyOf?: OpenApiSchemaOrRef[]
  nullable?: boolean
  properties?: Record<string, OpenApiSchemaOrRef>
  required?: string[]
  items?: OpenApiSchemaOrRef
  additionalProperties?: boolean | OpenApiSchemaOrRef
  description?: string
}

// Reference Object — `$ref` is REQUIRED.
export interface OpenApiReference {
  $ref: string
}

export type OpenApiParameterOrRef = OpenApiParameter | OpenApiReference

export type OpenApiRequestBodyOrRef = OpenApiRequestBody | OpenApiReference

export type OpenApiResponseOrRef = OpenApiResponse | OpenApiReference

export type OpenApiSchemaOrRef = OpenApiSchema | OpenApiReference
