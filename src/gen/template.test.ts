import { describe, it, expect } from 'vitest'
import {
  toPascalCase,
  formatPropertyKey,
  resolveRef,
  renderJSDoc,
  schemaTypeToTS,
  renderProperties,
  renderResourceInterface,
  type HerokuSchema,
  type SchemaNode,
} from './template.js'

describe('toPascalCase', () => {
  it('converts hyphenated names', () => {
    expect(toPascalCase('add-on-attachment')).toBe('AddOnAttachment')
  })

  it('converts single words', () => {
    expect(toPascalCase('account')).toBe('Account')
  })

  it('converts two-part names', () => {
    expect(toPascalCase('config-var')).toBe('ConfigVar')
  })
})

describe('formatPropertyKey', () => {
  it('returns valid identifiers as-is', () => {
    expect(formatPropertyKey('name')).toBe('name')
    expect(formatPropertyKey('created_at')).toBe('created_at')
    expect(formatPropertyKey('$ref')).toBe('$ref')
  })

  it('quotes keys with hyphens', () => {
    expect(formatPropertyKey('nav-data')).toBe("'nav-data'")
    expect(formatPropertyKey('default-permission')).toBe("'default-permission'")
  })

  it('quotes keys with special characters', () => {
    expect(formatPropertyKey('ca_signed?')).toBe("'ca_signed?'")
  })

  it('quotes keys with brackets and colons', () => {
    expect(formatPropertyKey('["NAME"]: ["value"]')).toBe("'[\"NAME\"]: [\"value\"]'")
  })

  it('escapes single quotes in keys', () => {
    expect(formatPropertyKey("it's")).toBe("'it\\'s'")
  })
})

describe('renderJSDoc', () => {
  it('returns empty string for undefined description', () => {
    expect(renderJSDoc(undefined, '')).toBe('')
  })

  it('renders single-line description', () => {
    expect(renderJSDoc('unique identifier', '  ')).toBe('  /** unique identifier */\n')
  })

  it('renders multi-line description', () => {
    expect(renderJSDoc('line one\nline two', '')).toBe(
      '/**\n * line one\n * line two\n */\n',
    )
  })
})

describe('resolveRef', () => {
  const schema: HerokuSchema = {
    definitions: {
      account: {
        definitions: {
          id: { type: ['string'], description: 'unique identifier' },
          email: { type: ['string'], format: 'email' },
        },
        properties: {},
      },
    },
  }

  it('resolves a sub-definition ref', () => {
    const result = resolveRef(schema, '#/definitions/account/definitions/id')
    expect(result).toEqual({ type: ['string'], description: 'unique identifier' })
  })

  it('resolves a top-level definition ref', () => {
    const result = resolveRef(schema, '#/definitions/account')
    expect(result).toHaveProperty('definitions')
  })

  it('throws on invalid ref path', () => {
    expect(() => resolveRef(schema, '#/definitions/nonexistent')).toThrow()
  })
})

describe('schemaTypeToTS', () => {
  const schema: HerokuSchema = {
    definitions: {
      account: {
        definitions: {
          id: { type: ['string'] },
          name: { type: ['string', 'null'] },
          status: { type: ['string'], enum: ['active', 'suspended'] },
          age: { type: ['integer'] },
          score: { type: ['number'] },
          verified: { type: ['boolean'] },
          count: { type: ['integer', 'null'] },
        },
        properties: {},
      },
      app: {
        definitions: {
          id: { type: ['string'] },
        },
        properties: {
          id: { $ref: '#/definitions/app/definitions/id' },
        },
      },
    },
  }

  it('converts string type', () => {
    expect(schemaTypeToTS({ type: ['string'] }, schema)).toBe('string')
  })

  it('converts nullable string', () => {
    expect(schemaTypeToTS({ type: ['string', 'null'] }, schema)).toBe('string | null')
  })

  it('converts boolean type', () => {
    expect(schemaTypeToTS({ type: ['boolean'] }, schema)).toBe('boolean')
  })

  it('converts integer to number', () => {
    expect(schemaTypeToTS({ type: ['integer'] }, schema)).toBe('number')
  })

  it('converts number type', () => {
    expect(schemaTypeToTS({ type: ['number'] }, schema)).toBe('number')
  })

  it('converts nullable integer', () => {
    expect(schemaTypeToTS({ type: ['integer', 'null'] }, schema)).toBe('number | null')
  })

  it('converts nullable boolean', () => {
    expect(schemaTypeToTS({ type: ['boolean', 'null'] }, schema)).toBe('boolean | null')
  })

  it('converts enum to string literal union', () => {
    const node: SchemaNode = { type: ['string'], enum: ['active', 'suspended'] }
    expect(schemaTypeToTS(node, schema)).toBe("'active' | 'suspended'")
  })

  it('resolves $ref to sub-definition', () => {
    const node: SchemaNode = { $ref: '#/definitions/account/definitions/id' }
    expect(schemaTypeToTS(node, schema)).toBe('string')
  })

  it('resolves $ref to top-level resource as interface name', () => {
    const node: SchemaNode = { $ref: '#/definitions/app' }
    expect(schemaTypeToTS(node, schema)).toBe('App')
  })

  it('converts inline nested object with required/optional', () => {
    const node: SchemaNode = {
      type: ['object'],
      required: ['id'],
      properties: {
        id: { type: ['string'] },
        name: { type: ['string'] },
      },
    }
    const result = schemaTypeToTS(node, schema)
    expect(result).toContain('id: string')
    expect(result).toContain('name?: string')
    expect(result).toMatch(/^\{/)
  })

  it('converts nullable inline object', () => {
    const node: SchemaNode = {
      type: ['object', 'null'],
      required: ['id'],
      properties: {
        id: { type: ['string'] },
      },
    }
    const result = schemaTypeToTS(node, schema)
    expect(result).toContain('id: string')
    expect(result).toContain('| null')
  })

  it('converts object with patternProperties as Record', () => {
    const node: SchemaNode = {
      type: ['object'],
      patternProperties: {
        '^\\w+$': { type: ['string', 'null'] },
      },
    }
    expect(schemaTypeToTS(node, schema)).toBe('Record<string, string | null>')
  })

  it('converts plain object without properties as Record<string, unknown>', () => {
    const node: SchemaNode = { type: ['object'] }
    expect(schemaTypeToTS(node, schema)).toBe('Record<string, unknown>')
  })

  it('converts array with items', () => {
    const node: SchemaNode = {
      type: ['array'],
      items: { type: ['string'] },
    }
    expect(schemaTypeToTS(node, schema)).toBe('Array<string>')
  })

  it('converts array with $ref items', () => {
    const node: SchemaNode = {
      type: ['array'],
      items: { $ref: '#/definitions/app' },
    }
    expect(schemaTypeToTS(node, schema)).toBe('Array<App>')
  })

  it('converts nullable array', () => {
    const node: SchemaNode = {
      type: ['array', 'null'],
      items: { type: ['string'] },
    }
    expect(schemaTypeToTS(node, schema)).toBe('Array<string> | null')
  })

  it('converts array without items as unknown[]', () => {
    const node: SchemaNode = { type: ['array'] }
    expect(schemaTypeToTS(node, schema)).toBe('unknown[]')
  })

  it('converts anyOf to union', () => {
    const node: SchemaNode = {
      anyOf: [
        { $ref: '#/definitions/account/definitions/id' },
        { $ref: '#/definitions/account/definitions/name' },
      ],
    }
    expect(schemaTypeToTS(node, schema)).toBe('string | string | null')
  })

  it('returns unknown for empty node', () => {
    expect(schemaTypeToTS({}, schema)).toBe('unknown')
  })
})

describe('renderProperties', () => {
  const schema: HerokuSchema = {
    definitions: {
      account: {
        definitions: {
          id: { type: ['string'] },
          email: { type: ['string'] },
        },
        properties: {},
      },
    },
  }

  it('renders properties with correct indentation', () => {
    const properties: Record<string, SchemaNode> = {
      id: { $ref: '#/definitions/account/definitions/id' },
      email: { $ref: '#/definitions/account/definitions/email' },
    }
    const result = renderProperties(properties, schema, 1, ['id', 'email'])
    expect(result).toBe('  id: string\n  email: string')
  })

  it('marks non-required properties as optional', () => {
    const properties: Record<string, SchemaNode> = {
      id: { $ref: '#/definitions/account/definitions/id' },
      email: { $ref: '#/definitions/account/definitions/email' },
    }
    const result = renderProperties(properties, schema, 1, ['id'])
    expect(result).toBe('  id: string\n  email?: string')
  })

  it('marks all properties optional when required is empty', () => {
    const properties: Record<string, SchemaNode> = {
      id: { type: ['string'] },
      name: { type: ['string'] },
    }
    const result = renderProperties(properties, schema)
    expect(result).toBe('  id?: string\n  name?: string')
  })

  it('emits JSDoc from property descriptions', () => {
    const properties: Record<string, SchemaNode> = {
      id: { type: ['string'], description: 'unique identifier' },
      name: { type: ['string'] },
    }
    const result = renderProperties(properties, schema, 1, ['id', 'name'])
    expect(result).toBe(
      '  /** unique identifier */\n  id: string\n  name: string',
    )
  })

  it('emits JSDoc from resolved $ref descriptions', () => {
    const schemaWithDescs: HerokuSchema = {
      definitions: {
        account: {
          definitions: {
            id: { type: ['string'], description: 'unique identifier' },
          },
          properties: {},
        },
      },
    }
    const properties: Record<string, SchemaNode> = {
      id: { $ref: '#/definitions/account/definitions/id' },
    }
    const result = renderProperties(properties, schemaWithDescs, 1, ['id'])
    expect(result).toBe('  /** unique identifier */\n  id: string')
  })

  it('quotes non-identifier property keys', () => {
    const properties: Record<string, SchemaNode> = {
      'nav-data': { type: ['string'] },
      'ca_signed?': { type: ['boolean'] },
      normal_key: { type: ['number'] },
    }
    const result = renderProperties(properties, schema, 1, ['nav-data', 'ca_signed?', 'normal_key'])
    expect(result).toBe("  'nav-data': string\n  'ca_signed?': boolean\n  normal_key: number")
  })
})

describe('renderResourceInterface', () => {
  const schema: HerokuSchema = {
    definitions: {
      account: {
        description: 'An account represents an individual signed up to use the Heroku platform.',
        definitions: {
          id: { type: ['string'] },
          name: { type: ['string', 'null'] },
          verified: { type: ['boolean'] },
        },
        required: ['id'],
        properties: {
          id: { $ref: '#/definitions/account/definitions/id' },
          name: { $ref: '#/definitions/account/definitions/name' },
          verified: { $ref: '#/definitions/account/definitions/verified' },
        },
      },
    },
  }

  it('generates a complete interface with JSDoc and required/optional properties', () => {
    const result = renderResourceInterface('account', schema.definitions['account'], schema)
    expect(result).toBe(
      '/** An account represents an individual signed up to use the Heroku platform. */\n' +
      'export interface Account {\n' +
      '  id: string\n' +
      '  name?: string | null\n' +
      '  verified?: boolean\n' +
      '}',
    )
  })

  it('returns empty string for definitions without properties', () => {
    const result = renderResourceInterface('config-var', { type: ['object'] }, schema)
    expect(result).toBe('')
  })

  it('converts hyphenated names to PascalCase', () => {
    const result = renderResourceInterface('add-on-attachment', {
      properties: {
        id: { type: ['string'] },
      },
    }, schema)
    expect(result).toContain('export interface AddOnAttachment')
  })
})

describe('renderResourceInterface with inline nested objects', () => {
  const schema: HerokuSchema = {
    definitions: {
      team: {
        definitions: {
          id: { type: ['string'] },
          name: { type: ['string'] },
        },
        properties: {},
      },
      account: {
        definitions: {},
        required: ['id', 'default_team'],
        properties: {
          id: { type: ['string'] },
          default_team: {
            type: ['object', 'null'],
            required: ['id'],
            properties: {
              id: { $ref: '#/definitions/team/definitions/id' },
              name: { $ref: '#/definitions/team/definitions/name' },
            },
          },
        },
      },
    },
  }

  it('renders inline nested objects with proper indentation and optionality', () => {
    const result = renderResourceInterface('account', schema.definitions['account'], schema)
    expect(result).toBe(
      'export interface Account {\n' +
      '  id: string\n' +
      '  default_team: {\n' +
      '    id: string\n' +
      '    name?: string\n' +
      '  } | null\n' +
      '}',
    )
  })
})

