// Schema type definitions for the Heroku Platform API hyperschema.

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
  patternProperties?: Record<string, SchemaNode>
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

export interface HRefParam {
  name: string
  type: string
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RouteDefinition {
  method: HttpMethod
  path: string
  hasRequestBody?: true
}
