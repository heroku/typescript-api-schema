// Intermediate model used by the shared TypeScript emitter. Each generator
// pipeline (hyperschema, data) normalizes its input into this model; the
// emitter is the single source of truth for output style.

export interface TypesModel {
  resources: ResourceModel[]
  client?: ClientModel
}

export interface ResourceModel {
  name: string
  description?: string
  /**
   * Top-level shape exported as `interface <PascalName>`. When `kind` is
   * `'interface'` the resource emits `export interface Name { ... }`. When
   * `kind` is `'alias'` it emits `export type Name = <type>`. Resources
   * without a top-level shape (the data pipeline) leave this undefined.
   */
  shape?: ResourceShape
  /**
   * Per-link auxiliary types: request bodies (`Opts`) and response shapes
   * (`Result`). Each becomes its own top-level `export interface`.
   */
  auxTypes: AuxType[]
}

export type ResourceShape =
  | { kind: 'interface'; shape: ObjectShape }
  | { kind: 'alias'; type: TypeRef }

export interface AuxType {
  name: string
  description?: string
  shape: ObjectShape
}

export interface ClientModel {
  resources: ClientResourceModel[]
}

export interface ClientResourceModel {
  name: string
  description?: string
  methods: MethodModel[]
}

export interface MethodModel {
  name: string
  description?: string
  params: ParamModel[]
  returnType: TypeRef
}

export interface ParamModel {
  name: string
  type: TypeRef
}

export interface ObjectShape {
  properties: PropertyModel[]
}

export interface PropertyModel {
  key: string
  description?: string
  type: TypeRef
  required: boolean
}

export type TypeRef =
  | { kind: 'primitive'; primitive: 'string' | 'number' | 'boolean' | 'unknown' | 'void' }
  | { kind: 'literal'; value: string | number | boolean }
  // TODO(unify-generators PR-2): drop `style` once the byte-identity gate is
  // removed. The original render.ts inconsistently emits `T[]` for `instances`
  // link return types but `Array<T>` everywhere else; the field exists solely
  // to preserve that asymmetry through PR-1's byte-identity check.
  | { kind: 'array'; items?: TypeRef; style?: 'brackets' }
  | { kind: 'record'; valueType: TypeRef }
  | { kind: 'union'; members: TypeRef[] }
  | { kind: 'intersection'; members: TypeRef[] }
  | { kind: 'reference'; name: string }
  | { kind: 'object'; shape: ObjectShape }
