// Pure model-to-text TypeScript emitter. Owns every output style choice
// (quoting, indentation, JSDoc formatting, identifier escaping, union
// member ordering). Both generator pipelines feed it through `TypesModel`.

import type {
  AuxType,
  ClientResourceModel,
  MethodModel,
  ObjectShape,
  PropertyModel,
  ResourceModel,
  TypeRef,
  TypesModel,
} from './model.js'

const VALID_IDENTIFIER = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
const INDENT_UNIT = '  '

export interface EmitOptions {
  /**
   * Emit the per-resource top-level shape (`export interface Foo` /
   * `export type Foo`). The hyperschema pipeline always sets this; the
   * data pipeline omits it because its inputs lack resource-level shapes.
   */
  emitResourceShapes?: boolean
}

export function emitTypes(model: TypesModel, options: EmitOptions = {}): string {
  const { emitResourceShapes = true } = options
  const blocks: string[] = []

  for (const resource of model.resources) {
    if (emitResourceShapes && resource.shape) {
      blocks.push(emitResourceShape(resource))
    }
    for (const aux of resource.auxTypes) {
      blocks.push(emitAuxType(aux))
    }
  }

  if (model.client && model.client.resources.length > 0) {
    blocks.push(emitClient(model.client.resources))
  }

  return blocks.join('\n\n') + '\n'
}

function emitResourceShape(resource: ResourceModel): string {
  const doc = renderJSDoc(resource.description, '')
  const interfaceName = resource.name
  const shape = resource.shape!

  if (shape.kind === 'interface') {
    const body = renderProperties(shape.shape, 1)
    return `${doc}export interface ${interfaceName} {\n${body}\n}`
  }

  return `${doc}export type ${interfaceName} = ${renderType(shape.type, 0)}`
}

function emitAuxType(aux: AuxType): string {
  const doc = renderJSDoc(aux.description, '')
  const body = renderProperties(aux.shape, 1)
  return `${doc}export interface ${aux.name} {\n${body}\n}`
}

function emitClient(resources: ClientResourceModel[]): string {
  const memberLines: string[] = []
  for (const resource of resources) {
    if (resource.methods.length === 0) continue
    const doc = renderJSDoc(resource.description, INDENT_UNIT)
    const body = resource.methods.map(emitMethod).join('\n')
    memberLines.push(`${doc}${INDENT_UNIT}${resource.name}: {\n${body}\n${INDENT_UNIT}}`)
  }
  if (memberLines.length === 0) return ''
  return `export interface HerokuClient {\n${memberLines.join('\n')}\n}`
}

function emitMethod(method: MethodModel): string {
  const doc = renderJSDoc(method.description, INDENT_UNIT)
  const params = method.params
    .map(p => `${p.name}: ${renderType(p.type, 0)}`)
    .join(', ')
  const ret = renderType(method.returnType, 0)
  return `${doc}${INDENT_UNIT}${method.name}(${params}): Promise<${ret}>`
}

function renderProperties(shape: ObjectShape, indent: number): string {
  const pad = INDENT_UNIT.repeat(indent)
  return shape.properties
    .map((prop: PropertyModel) => {
      const doc = renderJSDoc(prop.description, pad)
      const key = formatPropertyKey(prop.key)
      const optional = prop.required ? '' : '?'
      const type = renderType(prop.type, indent)
      return `${doc}${pad}${key}${optional}: ${type}`
    })
    .join('\n')
}

function renderType(ref: TypeRef, indent: number): string {
  switch (ref.kind) {
    case 'primitive':
      return ref.primitive
    case 'literal':
      return typeof ref.value === 'string' ? `'${ref.value}'` : String(ref.value)
    case 'reference':
      return ref.name
    case 'array':
      return ref.items ? `Array<${renderType(ref.items, indent)}>` : 'unknown[]'
    case 'record':
      return `Record<string, ${renderType(ref.valueType, indent)}>`
    case 'union':
      return ref.members.map(m => renderType(m, indent)).join(' | ')
    case 'intersection':
      return ref.members.map(m => renderType(m, indent)).join(' & ')
    case 'object': {
      const closePad = INDENT_UNIT.repeat(indent)
      const body = renderProperties(ref.shape, indent + 1)
      return `{\n${body}\n${closePad}}`
    }
  }
}

function renderJSDoc(description: string | undefined, indent: string): string {
  if (!description) return ''
  if (!description.includes('\n')) {
    return `${indent}/** ${description} */\n`
  }
  const lines = description.split('\n')
  return `${indent}/**\n${lines.map(l => `${indent} * ${l}`).join('\n')}\n${indent} */\n`
}

function formatPropertyKey(key: string): string {
  return VALID_IDENTIFIER.test(key) ? key : `'${key.replace(/'/g, "\\'")}'`
}
