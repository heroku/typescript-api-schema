import { describe, it, expect } from 'vitest'
import {
  toPascalCase,
  toCamelCase,
  formatPropertyKey,
  resolveRef,
  renderJSDoc,
  schemaTypeToTS,
  renderProperties,
  renderResourceInterface,
  renderLinkTypes,
  disambiguateLinkTitles,
  parseHRefParams,
  renderMethodSignatures,
  renderClientInterface,
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

  it('deduplicates anyOf members that resolve to the same type', () => {
    const node: SchemaNode = {
      anyOf: [
        { $ref: '#/definitions/account/definitions/id' },
        { $ref: '#/definitions/account/definitions/id' },
      ],
    }
    expect(schemaTypeToTS(node, schema)).toBe('string')
  })

  it('deduplicates oneOf members that resolve to the same type', () => {
    const node: SchemaNode = {
      oneOf: [
        { type: ['string'] },
        { type: ['string'] },
        { type: ['integer'] },
      ],
    }
    expect(schemaTypeToTS(node, schema)).toBe('string | number')
  })

  it('resolves $ref chains through anyOf', () => {
    const schemaWithChain: HerokuSchema = {
      definitions: {
        account: {
          definitions: {
            id: { type: ['string'] },
            identity: {
              anyOf: [
                { $ref: '#/definitions/account/definitions/id' },
              ],
            },
          },
          properties: {},
        },
      },
    }
    const node: SchemaNode = { $ref: '#/definitions/account/definitions/identity' }
    expect(schemaTypeToTS(node, schemaWithChain)).toBe('string')
  })

  it('converts allOf to intersection', () => {
    const node: SchemaNode = {
      allOf: [
        { $ref: '#/definitions/app' },
        { type: ['object'], properties: { extra: { type: ['string'] } } },
      ],
    }
    const result = schemaTypeToTS(node, schema)
    expect(result).toContain('App')
    expect(result).toContain('&')
    expect(result).toContain('extra')
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

  it('emits type alias for object without properties', () => {
    const result = renderResourceInterface('app-webhook', { type: ['object'] }, schema)
    expect(result).toBe('export type AppWebhook = Record<string, unknown>')
  })

  it('emits type alias with patternProperties as Record', () => {
    const result = renderResourceInterface('config-var', {
      type: ['object'],
      patternProperties: { '^\\w+$': { type: ['string', 'null'] } },
    }, schema)
    expect(result).toBe('export type ConfigVar = Record<string, string | null>')
  })

  it('emits JSDoc on type aliases', () => {
    const result = renderResourceInterface('app-webhook', {
      type: ['object'],
      description: 'Represents a webhook.',
    }, schema)
    expect(result).toBe('/** Represents a webhook. */\nexport type AppWebhook = Record<string, unknown>')
  })

  it('returns empty string for definitions without properties or type', () => {
    const result = renderResourceInterface('unknown', {}, schema)
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

describe('disambiguateLinkTitles', () => {
  it('returns titles unchanged when unique', () => {
    const links = [
      { title: 'Create', method: 'POST' },
      { title: 'List', method: 'GET' },
    ]
    const result = disambiguateLinkTitles(links)
    expect(result.get(links[0])).toBe('Create')
    expect(result.get(links[1])).toBe('List')
  })

  it('appends method when titles collide (case-insensitive)', () => {
    const links = [
      { title: 'List', method: 'GET' },
      { title: 'list', method: 'POST' },
    ]
    const result = disambiguateLinkTitles(links)
    expect(result.get(links[0])).toBe('List-get')
    expect(result.get(links[1])).toBe('list-post')
  })

  it('skips links without title', () => {
    const links = [
      { method: 'GET' },
      { title: 'Create', method: 'POST' },
    ]
    const result = disambiguateLinkTitles(links)
    expect(result.size).toBe(1)
    expect(result.get(links[1])).toBe('Create')
  })
})

describe('renderLinkTypes', () => {
  const schema: HerokuSchema = {
    definitions: {
      app: {
        definitions: {
          id: { type: ['string'], description: 'unique identifier' },
          name: { type: ['string'], description: 'app name' },
        },
        required: ['id', 'name'],
        properties: {
          id: { $ref: '#/definitions/app/definitions/id' },
          name: { $ref: '#/definitions/app/definitions/name' },
        },
        links: [
          {
            title: 'Create',
            description: 'Create a new app.',
            method: 'POST',
            href: '/apps',
            schema: {
              properties: {
                name: { $ref: '#/definitions/app/definitions/name' },
                region: { type: ['string'] },
              },
              required: ['name'],
            },
          },
          {
            title: 'List',
            description: 'List existing apps.',
            method: 'GET',
            href: '/apps',
            rel: 'instances',
            targetSchema: {
              type: ['array'],
              items: { $ref: '#/definitions/app' },
            },
          },
          {
            title: 'Info',
            description: 'Info for an app.',
            method: 'GET',
            href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}',
            // targetSchema same as resource — no Result type
          },
          {
            title: 'Update',
            description: 'Update an existing app.',
            method: 'PATCH',
            href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}',
            schema: {
              properties: {
                name: { $ref: '#/definitions/app/definitions/name' },
                maintenance: { type: ['boolean'] },
              },
            },
            targetSchema: {
              properties: {
                id: { $ref: '#/definitions/app/definitions/id' },
                name: { $ref: '#/definitions/app/definitions/name' },
                maintenance: { type: ['boolean'] },
              },
              required: ['id'],
            },
          },
        ],
      },
    },
  }

  it('generates Opts interface for links with custom request schema', () => {
    const results = renderLinkTypes('app', schema.definitions['app'], schema)
    const createOpts = results.find(r => r.includes('AppCreateOpts'))
    expect(createOpts).toBeDefined()
    expect(createOpts).toContain('name: string')
    expect(createOpts).toContain('region?: string')
  })

  it('generates Result interface for links with custom targetSchema', () => {
    const results = renderLinkTypes('app', schema.definitions['app'], schema)
    const updateResult = results.find(r => r.includes('AppUpdateResult'))
    expect(updateResult).toBeDefined()
    expect(updateResult).toContain('id: string')
    expect(updateResult).toContain('maintenance?: boolean')
  })

  it('does not generate Result for links whose targetSchema has no properties', () => {
    const results = renderLinkTypes('app', schema.definitions['app'], schema)
    expect(results.find(r => r.includes('AppListResult'))).toBeUndefined()
  })

  it('does not generate types for links without title', () => {
    const def = {
      ...schema.definitions['app'],
      links: [{ method: 'GET', href: '/apps' }],
    }
    expect(renderLinkTypes('app', def, schema)).toEqual([])
  })

  it('returns empty array for definitions without links', () => {
    expect(renderLinkTypes('app', { properties: {} }, schema)).toEqual([])
  })

  it('includes JSDoc from link description', () => {
    const results = renderLinkTypes('app', schema.definitions['app'], schema)
    const createOpts = results.find(r => r.includes('AppCreateOpts'))
    expect(createOpts).toContain('/** Create a new app. */')
  })
})

describe('toCamelCase', () => {
  it('converts hyphenated names', () => {
    expect(toCamelCase('app-identity')).toBe('appIdentity')
  })

  it('converts single words', () => {
    expect(toCamelCase('account')).toBe('account')
  })
})

describe('parseHRefParams', () => {
  const schema: HerokuSchema = {
    definitions: {
      app: {
        definitions: {
          id: { type: ['string'], description: 'unique identifier' },
          name: { type: ['string'] },
        },
        properties: {},
      },
    },
  }

  it('parses URL-encoded href params', () => {
    const params = parseHRefParams(
      '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}',
      schema,
    )
    expect(params).toEqual([{ name: 'appId', type: 'string' }])
  })

  it('parses non-encoded href params', () => {
    const params = parseHRefParams(
      '/apps/{(#/definitions/app/definitions/id)}',
      schema,
    )
    expect(params).toEqual([{ name: 'appId', type: 'string' }])
  })

  it('parses multiple params', () => {
    const params = parseHRefParams(
      '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}/config/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fname)}',
      schema,
    )
    expect(params).toHaveLength(2)
    expect(params[0].name).toBe('appId')
    expect(params[1].name).toBe('appName')
  })

  it('returns empty array for href with no params', () => {
    expect(parseHRefParams('/apps', schema)).toEqual([])
  })

  it('uses preceding URL segment to disambiguate colliding param names', () => {
    const schemaWithIdp: HerokuSchema = {
      definitions: {
        'identity-provider': {
          definitions: {
            identity: { type: ['string'] },
          },
          properties: {},
        },
      },
    }
    const params = parseHRefParams(
      '/identity-providers/{(%23%2Fdefinitions%2Fidentity-provider%2Fdefinitions%2Fidentity)}/certificates/{(%23%2Fdefinitions%2Fidentity-provider%2Fdefinitions%2Fidentity)}',
      schemaWithIdp,
    )
    expect(params).toHaveLength(2)
    expect(params[0].name).toBe('identityProvidersIdentity')
    expect(params[1].name).toBe('certificatesIdentity')
    expect(params[0].type).toBe('string')
    expect(params[1].type).toBe('string')
  })

  it('keeps default names when there are no collisions', () => {
    const params = parseHRefParams(
      '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}/builds/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fname)}',
      schema,
    )
    expect(params).toHaveLength(2)
    expect(params[0].name).toBe('appId')
    expect(params[1].name).toBe('appName')
  })
})

describe('renderMethodSignatures', () => {
  const schema: HerokuSchema = {
    definitions: {
      app: {
        definitions: {
          id: { type: ['string'] },
          name: { type: ['string'] },
        },
        required: ['id', 'name'],
        properties: {
          id: { $ref: '#/definitions/app/definitions/id' },
          name: { $ref: '#/definitions/app/definitions/name' },
        },
        links: [
          {
            title: 'Create',
            description: 'Create a new app.',
            method: 'POST',
            href: '/apps',
            schema: {
              properties: { name: { type: ['string'] } },
              required: ['name'],
            },
          },
          {
            title: 'Info',
            description: 'Info for existing app.',
            method: 'GET',
            href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}',
          },
          {
            title: 'List',
            method: 'GET',
            href: '/apps',
            rel: 'instances',
          },
          {
            title: 'Delete',
            method: 'DELETE',
            href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}',
            targetSchema: { type: ['null'] },
          },
        ],
      },
    },
  }

  it('generates method with path params and request body', () => {
    const methods = renderMethodSignatures('app', schema.definitions['app'], schema)
    const create = methods.find(m => m.includes('create('))
    expect(create).toContain('requestBody: AppCreateOpts')
    expect(create).toContain('Promise<App>')
  })

  it('generates method with path params for Info', () => {
    const methods = renderMethodSignatures('app', schema.definitions['app'], schema)
    const info = methods.find(m => m.includes('info('))
    expect(info).toContain('appId: string')
    expect(info).toContain('Promise<App>')
  })

  it('generates list method returning array', () => {
    const methods = renderMethodSignatures('app', schema.definitions['app'], schema)
    const list = methods.find(m => m.includes('list('))
    expect(list).toContain('Promise<App[]>')
  })

  it('generates void return for null targetSchema', () => {
    const methods = renderMethodSignatures('app', schema.definitions['app'], schema)
    const del = methods.find(m => m.includes('delete('))
    expect(del).toContain('Promise<void>')
  })

  it('includes JSDoc from link description', () => {
    const methods = renderMethodSignatures('app', schema.definitions['app'], schema)
    const create = methods.find(m => m.includes('create('))
    expect(create).toContain('/** Create a new app. */')
  })

  it('skips links with rel=self', () => {
    const defWithSelf = {
      ...schema.definitions['app'],
      links: [{ title: 'Self', rel: 'self', href: '/schema', method: 'GET' }],
    }
    expect(renderMethodSignatures('app', defWithSelf, schema)).toEqual([])
  })
})

describe('renderClientInterface', () => {
  const schema: HerokuSchema = {
    definitions: {
      app: {
        description: 'An app represents a program.',
        definitions: {
          id: { type: ['string'] },
        },
        required: ['id'],
        properties: {
          id: { $ref: '#/definitions/app/definitions/id' },
        },
        links: [
          {
            title: 'List',
            method: 'GET',
            href: '/apps',
            rel: 'instances',
          },
        ],
      },
      'config-var': {
        type: ['object'],
        // no links, no properties
      },
    },
  }

  it('generates a client interface with resource namespaces', () => {
    const result = renderClientInterface(schema)
    expect(result).toContain('export interface HerokuClient')
    expect(result).toContain('app: {')
    expect(result).toContain('list(): Promise<App[]>')
  })

  it('skips resources with no links', () => {
    const result = renderClientInterface(schema)
    expect(result).not.toContain('configVar')
  })

  it('includes resource JSDoc', () => {
    const result = renderClientInterface(schema)
    expect(result).toContain('/** An app represents a program. */')
  })

  it('returns empty string when no resources have links', () => {
    const noLinks: HerokuSchema = {
      definitions: {
        account: { properties: { id: { type: ['string'] } } },
      },
    }
    expect(renderClientInterface(noLinks)).toBe('')
  })
})

