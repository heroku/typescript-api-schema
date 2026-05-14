import { describe, it, expect } from 'vitest'
import { emitTypes } from './ts-emit.js'
import type { TypesModel, TypeRef } from './model.js'

function emitInterfaceWithProp(type: TypeRef): string {
  const model: TypesModel = {
    resources: [
      {
        name: 'Foo',
        auxTypes: [],
        shape: {
          kind: 'interface',
          shape: {
            properties: [{ key: 'value', type, required: true }],
          },
        },
      },
    ],
  }
  return emitTypes(model)
}

describe('emitTypes — TypeRef rendering', () => {
  it('emits primitives unchanged', () => {
    expect(emitInterfaceWithProp({ kind: 'primitive', primitive: 'string' }))
      .toContain('value: string')
    expect(emitInterfaceWithProp({ kind: 'primitive', primitive: 'number' }))
      .toContain('value: number')
    expect(emitInterfaceWithProp({ kind: 'primitive', primitive: 'boolean' }))
      .toContain('value: boolean')
    expect(emitInterfaceWithProp({ kind: 'primitive', primitive: 'unknown' }))
      .toContain('value: unknown')
  })

  it('quotes string literals with single quotes; numbers/booleans bare', () => {
    expect(emitInterfaceWithProp({ kind: 'literal', value: 'foo' }))
      .toContain("value: 'foo'")
    expect(emitInterfaceWithProp({ kind: 'literal', value: 42 }))
      .toContain('value: 42')
    expect(emitInterfaceWithProp({ kind: 'literal', value: true }))
      .toContain('value: true')
  })

  it('emits references by name', () => {
    expect(emitInterfaceWithProp({ kind: 'reference', name: 'App' }))
      .toContain('value: App')
  })

  it('emits arrays as Array<T> and unknown[] when items is omitted', () => {
    expect(emitInterfaceWithProp({
      kind: 'array',
      items: { kind: 'primitive', primitive: 'string' },
    })).toContain('value: Array<string>')
    expect(emitInterfaceWithProp({ kind: 'array' })).toContain('value: unknown[]')
  })

  it('emits records as Record<string, T>', () => {
    expect(emitInterfaceWithProp({
      kind: 'record',
      valueType: { kind: 'primitive', primitive: 'string' },
    })).toContain('value: Record<string, string>')
  })

  it('joins union members with " | " preserving order', () => {
    expect(emitInterfaceWithProp({
      kind: 'union',
      members: [
        { kind: 'primitive', primitive: 'string' },
        { kind: 'literal', value: '~' },
      ],
    })).toContain("value: string | '~'")
  })

  it('joins intersections with " & "', () => {
    expect(emitInterfaceWithProp({
      kind: 'intersection',
      members: [
        { kind: 'reference', name: 'A' },
        { kind: 'reference', name: 'B' },
      ],
    })).toContain('value: A & B')
  })

  it('emits inline object types with nested indentation', () => {
    const out = emitInterfaceWithProp({
      kind: 'object',
      shape: {
        properties: [
          { key: 'inner', type: { kind: 'primitive', primitive: 'string' }, required: true },
        ],
      },
    })
    expect(out).toContain('value: {')
    expect(out).toContain('    inner: string')
  })
})

describe('emitTypes — properties', () => {
  it('marks non-required properties with ?', () => {
    const model: TypesModel = {
      resources: [{
        name: 'Foo', auxTypes: [],
        shape: {
          kind: 'interface',
          shape: {
            properties: [
              { key: 'a', type: { kind: 'primitive', primitive: 'string' }, required: true },
              { key: 'b', type: { kind: 'primitive', primitive: 'string' }, required: false },
            ],
          },
        },
      }],
    }
    const out = emitTypes(model)
    expect(out).toContain('a: string')
    expect(out).toContain('b?: string')
  })

  it('escapes property keys that are not valid identifiers', () => {
    const model: TypesModel = {
      resources: [{
        name: 'Foo', auxTypes: [],
        shape: {
          kind: 'interface',
          shape: {
            properties: [
              { key: 'foo-bar', type: { kind: 'primitive', primitive: 'string' }, required: true },
              { key: 'normal', type: { kind: 'primitive', primitive: 'string' }, required: true },
            ],
          },
        },
      }],
    }
    const out = emitTypes(model)
    expect(out).toContain("'foo-bar': string")
    expect(out).toContain('normal: string')
  })

  it('emits single-line JSDoc for single-line descriptions', () => {
    const model: TypesModel = {
      resources: [{
        name: 'Foo', auxTypes: [],
        shape: {
          kind: 'interface',
          shape: {
            properties: [{
              key: 'value', required: true,
              description: 'a single line',
              type: { kind: 'primitive', primitive: 'string' },
            }],
          },
        },
      }],
    }
    expect(emitTypes(model)).toContain('/** a single line */')
  })

  it('emits multi-line JSDoc for descriptions containing newlines', () => {
    const model: TypesModel = {
      resources: [{
        name: 'Foo', auxTypes: [],
        shape: {
          kind: 'interface',
          shape: {
            properties: [{
              key: 'value', required: true,
              description: 'line one\nline two',
              type: { kind: 'primitive', primitive: 'string' },
            }],
          },
        },
      }],
    }
    const out = emitTypes(model)
    expect(out).toContain('   * line one')
    expect(out).toContain('   * line two')
  })
})

describe('emitTypes — resources and aux types', () => {
  it('emits type alias for shape kind=alias', () => {
    const model: TypesModel = {
      resources: [{
        name: 'ConfigVar', auxTypes: [],
        shape: {
          kind: 'alias',
          type: {
            kind: 'record',
            valueType: {
              kind: 'union',
              members: [
                { kind: 'primitive', primitive: 'string' },
                { kind: 'reference', name: 'null' },
              ],
            },
          },
        },
      }],
    }
    const out = emitTypes(model)
    expect(out).toContain('export type ConfigVar = Record<string, string | null>')
  })

  it('emits aux types as separate top-level interfaces', () => {
    const model: TypesModel = {
      resources: [{
        name: 'App',
        auxTypes: [{
          name: 'AppCreateOpts',
          shape: {
            properties: [
              { key: 'name', type: { kind: 'primitive', primitive: 'string' }, required: true },
            ],
          },
        }],
      }],
    }
    const out = emitTypes(model)
    expect(out).toContain('export interface AppCreateOpts {')
    expect(out).toContain('  name: string')
  })

  it('respects emitResourceShapes=false (data variant)', () => {
    const model: TypesModel = {
      resources: [{
        name: 'App', auxTypes: [],
        shape: {
          kind: 'interface',
          shape: { properties: [] },
        },
      }],
    }
    expect(emitTypes(model, { emitResourceShapes: false }))
      .not.toContain('export interface App {')
  })
})

describe('emitTypes — HerokuClient', () => {
  it('omits the client when no resources have methods', () => {
    const out = emitTypes({ resources: [], client: { resources: [] } })
    expect(out).not.toContain('export interface HerokuClient')
  })

  it('renders methods with params, return promise, and JSDoc', () => {
    const model: TypesModel = {
      resources: [],
      client: {
        resources: [{
          name: 'app',
          description: 'An app.',
          methods: [{
            name: 'info',
            description: 'Get info.',
            params: [
              { name: 'id', type: { kind: 'primitive', primitive: 'string' } },
            ],
            returnType: { kind: 'reference', name: 'App' },
          }],
        }],
      },
    }
    const out = emitTypes(model)
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toContain('  app: {')
    expect(out).toContain('  info(id: string): Promise<App>')
    expect(out).toContain('/** Get info. */')
  })

  it('omits resources whose methods array is empty', () => {
    const model: TypesModel = {
      resources: [],
      client: {
        resources: [
          { name: 'a', methods: [] },
          { name: 'b', methods: [{
            name: 'info', params: [],
            returnType: { kind: 'primitive', primitive: 'void' },
          }] },
        ],
      },
    }
    const out = emitTypes(model)
    expect(out).not.toContain('a: {')
    expect(out).toContain('b: {')
  })
})
