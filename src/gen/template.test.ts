import { describe, it, expect } from 'vitest'
import {
  toPascalCase,
  toCamelCase,
  formatPropertyKey,
  renderJSDoc,
  disambiguateLinkTitles,
  TypeRenderer,
  type HerokuSchema,
  type SchemaNode,
  type RouteDefinition,
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
  const renderer = new TypeRenderer(schema)

  it('resolves a sub-definition ref', () => {
    const result = renderer.resolveRef('#/definitions/account/definitions/id')
    expect(result).toEqual({ type: ['string'], description: 'unique identifier' })
  })

  it('resolves a top-level definition ref', () => {
    const result = renderer.resolveRef('#/definitions/account')
    expect(result).toHaveProperty('definitions')
  })

  it('throws on invalid ref path', () => {
    expect(() => renderer.resolveRef('#/definitions/nonexistent')).toThrow()
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
  const renderer = new TypeRenderer(schema)

  it('converts string type', () => {
    expect(renderer.schemaTypeToTS({ type: ['string'] })).toBe('string')
  })

  it('converts nullable string', () => {
    expect(renderer.schemaTypeToTS({ type: ['string', 'null'] })).toBe('string | null')
  })

  it('converts boolean type', () => {
    expect(renderer.schemaTypeToTS({ type: ['boolean'] })).toBe('boolean')
  })

  it('converts integer to number', () => {
    expect(renderer.schemaTypeToTS({ type: ['integer'] })).toBe('number')
  })

  it('converts number type', () => {
    expect(renderer.schemaTypeToTS({ type: ['number'] })).toBe('number')
  })

  it('converts nullable integer', () => {
    expect(renderer.schemaTypeToTS({ type: ['integer', 'null'] })).toBe('number | null')
  })

  it('converts nullable boolean', () => {
    expect(renderer.schemaTypeToTS({ type: ['boolean', 'null'] })).toBe('boolean | null')
  })

  it('converts enum to string literal union', () => {
    const node: SchemaNode = { type: ['string'], enum: ['active', 'suspended'] }
    expect(renderer.schemaTypeToTS(node)).toBe("'active' | 'suspended'")
  })

  it('resolves $ref to sub-definition', () => {
    const node: SchemaNode = { $ref: '#/definitions/account/definitions/id' }
    expect(renderer.schemaTypeToTS(node)).toBe('string')
  })

  it('resolves $ref to top-level resource as interface name', () => {
    const node: SchemaNode = { $ref: '#/definitions/app' }
    expect(renderer.schemaTypeToTS(node)).toBe('App')
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
    const result = renderer.schemaTypeToTS(node)
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
    const result = renderer.schemaTypeToTS(node)
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
    expect(renderer.schemaTypeToTS(node)).toBe('Record<string, string | null>')
  })

  it('converts plain object without properties as Record<string, unknown>', () => {
    const node: SchemaNode = { type: ['object'] }
    expect(renderer.schemaTypeToTS(node)).toBe('Record<string, unknown>')
  })

  it('converts array with items', () => {
    const node: SchemaNode = {
      type: ['array'],
      items: { type: ['string'] },
    }
    expect(renderer.schemaTypeToTS(node)).toBe('Array<string>')
  })

  it('converts array with $ref items', () => {
    const node: SchemaNode = {
      type: ['array'],
      items: { $ref: '#/definitions/app' },
    }
    expect(renderer.schemaTypeToTS(node)).toBe('Array<App>')
  })

  it('converts nullable array', () => {
    const node: SchemaNode = {
      type: ['array', 'null'],
      items: { type: ['string'] },
    }
    expect(renderer.schemaTypeToTS(node)).toBe('Array<string> | null')
  })

  it('converts array without items as unknown[]', () => {
    const node: SchemaNode = { type: ['array'] }
    expect(renderer.schemaTypeToTS(node)).toBe('unknown[]')
  })

  it('converts anyOf to union', () => {
    const node: SchemaNode = {
      anyOf: [
        { $ref: '#/definitions/account/definitions/id' },
        { $ref: '#/definitions/account/definitions/name' },
      ],
    }
    expect(renderer.schemaTypeToTS(node)).toBe('string | string | null')
  })

  it('deduplicates anyOf members that resolve to the same type', () => {
    const node: SchemaNode = {
      anyOf: [
        { $ref: '#/definitions/account/definitions/id' },
        { $ref: '#/definitions/account/definitions/id' },
      ],
    }
    expect(renderer.schemaTypeToTS(node)).toBe('string')
  })

  it('deduplicates oneOf members that resolve to the same type', () => {
    const node: SchemaNode = {
      oneOf: [
        { type: ['string'] },
        { type: ['string'] },
        { type: ['integer'] },
      ],
    }
    expect(renderer.schemaTypeToTS(node)).toBe('string | number')
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
    expect(new TypeRenderer(schemaWithChain).schemaTypeToTS(node)).toBe('string')
  })

  it('converts allOf to intersection', () => {
    const node: SchemaNode = {
      allOf: [
        { $ref: '#/definitions/app' },
        { type: ['object'], properties: { extra: { type: ['string'] } } },
      ],
    }
    const result = renderer.schemaTypeToTS(node)
    expect(result).toContain('App')
    expect(result).toContain('&')
    expect(result).toContain('extra')
  })

  it('returns unknown for empty node', () => {
    expect(renderer.schemaTypeToTS({})).toBe('unknown')
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
  const renderer = new TypeRenderer(schema)

  it('renders properties with correct indentation', () => {
    const properties: Record<string, SchemaNode> = {
      id: { $ref: '#/definitions/account/definitions/id' },
      email: { $ref: '#/definitions/account/definitions/email' },
    }
    const result = renderer.renderProperties(properties, 1, ['id', 'email'])
    expect(result).toBe('  id: string\n  email: string')
  })

  it('marks non-required properties as optional', () => {
    const properties: Record<string, SchemaNode> = {
      id: { $ref: '#/definitions/account/definitions/id' },
      email: { $ref: '#/definitions/account/definitions/email' },
    }
    const result = renderer.renderProperties(properties, 1, ['id'])
    expect(result).toBe('  id: string\n  email?: string')
  })

  it('marks all properties optional when required is empty', () => {
    const properties: Record<string, SchemaNode> = {
      id: { type: ['string'] },
      name: { type: ['string'] },
    }
    const result = renderer.renderProperties(properties)
    expect(result).toBe('  id?: string\n  name?: string')
  })

  it('emits JSDoc from property descriptions', () => {
    const properties: Record<string, SchemaNode> = {
      id: { type: ['string'], description: 'unique identifier' },
      name: { type: ['string'] },
    }
    const result = renderer.renderProperties(properties, 1, ['id', 'name'])
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
    const r = new TypeRenderer(schemaWithDescs)
    const properties: Record<string, SchemaNode> = {
      id: { $ref: '#/definitions/account/definitions/id' },
    }
    const result = r.renderProperties(properties, 1, ['id'])
    expect(result).toBe('  /** unique identifier */\n  id: string')
  })

  it('quotes non-identifier property keys', () => {
    const properties: Record<string, SchemaNode> = {
      'nav-data': { type: ['string'] },
      'ca_signed?': { type: ['boolean'] },
      normal_key: { type: ['number'] },
    }
    const result = renderer.renderProperties(properties, 1, ['nav-data', 'ca_signed?', 'normal_key'])
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
  const renderer = new TypeRenderer(schema)

  it('generates a complete interface with JSDoc and required/optional properties', () => {
    const result = renderer.renderResourceInterface('account', schema.definitions['account'])
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
    const result = renderer.renderResourceInterface('app-webhook', { type: ['object'] })
    expect(result).toBe('export type AppWebhook = Record<string, unknown>')
  })

  it('emits type alias with patternProperties as Record', () => {
    const result = renderer.renderResourceInterface('config-var', {
      type: ['object'],
      patternProperties: { '^\\w+$': { type: ['string', 'null'] } },
    })
    expect(result).toBe('export type ConfigVar = Record<string, string | null>')
  })

  it('emits JSDoc on type aliases', () => {
    const result = renderer.renderResourceInterface('app-webhook', {
      type: ['object'],
      description: 'Represents a webhook.',
    })
    expect(result).toBe('/** Represents a webhook. */\nexport type AppWebhook = Record<string, unknown>')
  })

  it('returns empty string for definitions without properties or type', () => {
    const result = renderer.renderResourceInterface('unknown', {})
    expect(result).toBe('')
  })

  it('converts hyphenated names to PascalCase', () => {
    const result = renderer.renderResourceInterface('add-on-attachment', {
      properties: {
        id: { type: ['string'] },
      },
    })
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
  const renderer = new TypeRenderer(schema)

  it('renders inline nested objects with proper indentation and optionality', () => {
    const result = renderer.renderResourceInterface('account', schema.definitions['account'])
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
  const renderer = new TypeRenderer(schema)

  it('generates Opts interface for links with custom request schema', () => {
    const results = renderer.renderLinkTypes('app', schema.definitions['app'])
    const createOpts = results.find(r => r.includes('AppCreateOpts'))
    expect(createOpts).toBeDefined()
    expect(createOpts).toContain('name: string')
    expect(createOpts).toContain('region?: string')
  })

  it('generates Result interface for links with custom targetSchema', () => {
    const results = renderer.renderLinkTypes('app', schema.definitions['app'])
    const updateResult = results.find(r => r.includes('AppUpdateResult'))
    expect(updateResult).toBeDefined()
    expect(updateResult).toContain('id: string')
    expect(updateResult).toContain('maintenance?: boolean')
  })

  it('does not generate Result for links whose targetSchema has no properties', () => {
    const results = renderer.renderLinkTypes('app', schema.definitions['app'])
    expect(results.find(r => r.includes('AppListResult'))).toBeUndefined()
  })

  it('generates Result interface when targetSchema is a $ref to a sub-definition', () => {
    const schemaWithRef: HerokuSchema = {
      definitions: {
        'add-on-webhook': {
          definitions: {
            addon_webhook: {
              properties: {
                id: { type: ['string'] },
                url: { type: ['string'] },
              },
              required: ['id'],
            },
          },
          type: ['object'],
          links: [
            {
              title: 'Create',
              description: 'Create a webhook.',
              method: 'POST',
              href: '/add-on-webhooks',
              targetSchema: { $ref: '#/definitions/add-on-webhook/definitions/addon_webhook' },
            },
          ],
        },
      },
    }
    const r = new TypeRenderer(schemaWithRef)
    const results = r.renderLinkTypes('add-on-webhook', schemaWithRef.definitions['add-on-webhook'])
    const createResult = results.find(r => r.includes('AddOnWebhookCreateResult'))
    expect(createResult).toBeDefined()
    expect(createResult).toContain('id: string')
    expect(createResult).toContain('url?: string')
  })

  it('does not generate Result when targetSchema $ref points to the same resource', () => {
    const accountDef = {
      definitions: { id: { type: ['string'] as string[] } },
      required: ['id'],
      properties: { id: { $ref: '#/definitions/account/definitions/id' } },
      links: [
        {
          title: 'Info',
          method: 'GET',
          href: '/account',
          targetSchema: { $ref: '#/definitions/account' },
        },
      ],
    }
    const schemaWithSelfRef: HerokuSchema = { definitions: { account: accountDef } }
    const r = new TypeRenderer(schemaWithSelfRef)
    const results = r.renderLinkTypes('account', accountDef)
    expect(results.find(r => r.includes('Result'))).toBeUndefined()
  })

  it('does not generate Result when targetSchema $ref points to a different top-level resource', () => {
    const schemaWithCrossRef: HerokuSchema = {
      definitions: {
        'add-on': {
          definitions: { id: { type: ['string'] } },
          required: ['id'],
          properties: { id: { $ref: '#/definitions/add-on/definitions/id' } },
        },
        'team-add-on': {
          type: ['object'],
          links: [
            {
              title: 'Info',
              method: 'GET',
              href: '/team-add-ons',
              targetSchema: { $ref: '#/definitions/add-on' },
            },
          ],
        },
      },
    }
    const r = new TypeRenderer(schemaWithCrossRef)
    const results = r.renderLinkTypes('team-add-on', schemaWithCrossRef.definitions['team-add-on'])
    expect(results.find(r => r.includes('Result'))).toBeUndefined()
  })

  it('does not generate types for links without title', () => {
    const def = {
      ...schema.definitions['app'],
      links: [{ method: 'GET', href: '/apps' }],
    }
    expect(renderer.renderLinkTypes('app', def)).toEqual([])
  })

  it('returns empty array for definitions without links', () => {
    expect(renderer.renderLinkTypes('app', { properties: {} })).toEqual([])
  })

  it('includes JSDoc from link description', () => {
    const results = renderer.renderLinkTypes('app', schema.definitions['app'])
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
  const renderer = new TypeRenderer(schema)

  it('parses URL-encoded href params', () => {
    const href = '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}'
    const params = renderer.parseHRefParams(href)
    expect(params).toEqual([{ name: 'appId', type: 'string' }])
  })

  it('parses non-encoded href params', () => {
    const href = '/apps/{(#/definitions/app/definitions/id)}'
    const params = renderer.parseHRefParams(href)
    expect(params).toEqual([{ name: 'appId', type: 'string' }])
  })

  it('parses multiple params', () => {
    const params = renderer.parseHRefParams(
      '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}/config/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fname)}',
    )
    expect(params).toHaveLength(2)
    expect(params[0].name).toBe('appId')
    expect(params[1].name).toBe('appName')
  })

  it('returns empty array for href with no params', () => {
    expect(renderer.parseHRefParams('/apps')).toEqual([])
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
    const r = new TypeRenderer(schemaWithIdp)
    const params = r.parseHRefParams(
      '/identity-providers/{(%23%2Fdefinitions%2Fidentity-provider%2Fdefinitions%2Fidentity)}/certificates/{(%23%2Fdefinitions%2Fidentity-provider%2Fdefinitions%2Fidentity)}',
    )
    expect(params).toHaveLength(2)
    expect(params[0].name).toBe('identityProvidersIdentity')
    expect(params[1].name).toBe('certificatesIdentity')
    expect(params[0].type).toBe('string')
    expect(params[1].type).toBe('string')
  })

  it('keeps default names when there are no collisions', () => {
    const params = renderer.parseHRefParams(
      '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}/builds/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fname)}',
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
  const renderer = new TypeRenderer(schema)

  it('generates method with path params and request body', () => {
    const methods = renderer.renderMethodSignatures('app', schema.definitions['app'])
    const create = methods.find(m => m.includes('create('))
    expect(create).toContain('requestBody: AppCreateOpts')
    expect(create).toContain('Promise<App>')
  })

  it('generates method with path params for Info', () => {
    const methods = renderer.renderMethodSignatures('app', schema.definitions['app'])
    const info = methods.find(m => m.includes('info('))
    expect(info).toContain('appId: string')
    expect(info).toContain('Promise<App>')
  })

  it('generates list method returning array', () => {
    const methods = renderer.renderMethodSignatures('app', schema.definitions['app'])
    const list = methods.find(m => m.includes('list('))
    expect(list).toContain('Promise<App[]>')
  })

  it('generates void return for null targetSchema', () => {
    const methods = renderer.renderMethodSignatures('app', schema.definitions['app'])
    const del = methods.find(m => m.includes('delete('))
    expect(del).toContain('Promise<void>')
  })

  it('includes JSDoc from link description', () => {
    const methods = renderer.renderMethodSignatures('app', schema.definitions['app'])
    const create = methods.find(m => m.includes('create('))
    expect(create).toContain('/** Create a new app. */')
  })

  it('includes links with rel=self', () => {
    const defWithSelf = {
      ...schema.definitions['app'],
      links: [{ title: 'Info', rel: 'self', href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}', method: 'GET' }],
    }
    const methods = renderer.renderMethodSignatures('app', defWithSelf)
    expect(methods.length).toBe(1)
    expect(methods[0]).toContain('info(')
  })

  it('returns Result type when targetSchema $ref points to a sub-definition', () => {
    const schemaWithRef: HerokuSchema = {
      definitions: {
        'add-on-webhook': {
          definitions: {
            addon_webhook: {
              properties: { id: { type: ['string'] }, url: { type: ['string'] } },
              required: ['id'],
            },
          },
          type: ['object'],
          links: [
            {
              title: 'Create',
              method: 'POST',
              href: '/add-on-webhooks',
              targetSchema: { $ref: '#/definitions/add-on-webhook/definitions/addon_webhook' },
            },
          ],
        },
      },
    }
    const r = new TypeRenderer(schemaWithRef)
    const methods = r.renderMethodSignatures('add-on-webhook', schemaWithRef.definitions['add-on-webhook'])
    const create = methods.find(m => m.includes('create('))
    expect(create).toContain('Promise<AddOnWebhookCreateResult>')
  })

  it('returns cross-referenced resource type when targetSchema $ref points to another resource', () => {
    const schemaWithCrossRef: HerokuSchema = {
      definitions: {
        'add-on': {
          definitions: { id: { type: ['string'] } },
          required: ['id'],
          properties: { id: { $ref: '#/definitions/add-on/definitions/id' } },
        },
        'team-add-on': {
          type: ['object'],
          links: [
            {
              title: 'Info',
              method: 'GET',
              href: '/team-add-ons',
              targetSchema: { $ref: '#/definitions/add-on' },
            },
          ],
        },
      },
    }
    const r = new TypeRenderer(schemaWithCrossRef)
    const methods = r.renderMethodSignatures('team-add-on', schemaWithCrossRef.definitions['team-add-on'])
    const info = methods.find(m => m.includes('info('))
    expect(info).toContain('Promise<AddOn>')
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
  const renderer = new TypeRenderer(schema)

  it('generates a client interface with resource namespaces', () => {
    const result = renderer.renderClientInterface()
    expect(result).toContain('export interface HerokuClient')
    expect(result).toContain('app: {')
    expect(result).toContain('list(): Promise<App[]>')
  })

  it('skips resources with no links', () => {
    const result = renderer.renderClientInterface()
    expect(result).not.toContain('configVar')
  })

  it('includes resource JSDoc', () => {
    const result = renderer.renderClientInterface()
    expect(result).toContain('/** An app represents a program. */')
  })

  it('returns empty string when no resources have links', () => {
    const noLinks: HerokuSchema = {
      definitions: {
        account: { properties: { id: { type: ['string'] } } },
      },
    }
    expect(new TypeRenderer(noLinks).renderClientInterface()).toBe('')
  })
})

describe('renderRouteEntries', () => {
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
            method: 'POST',
            href: '/apps',
            schema: {
              properties: { name: { type: ['string'] } },
              required: ['name'],
            },
          },
          {
            title: 'Info',
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
  const renderer = new TypeRenderer(schema)

  it('returns correct HTTP method from link', () => {
    const entries = renderer.renderRouteEntries('app', schema.definitions['app'])
    const create = entries.find(e => e.titleKey === 'Create')
    expect(create?.method).toBe('POST')
    const info = entries.find(e => e.titleKey === 'Info')
    expect(info?.method).toBe('GET')
    const del = entries.find(e => e.titleKey === 'Delete')
    expect(del?.method).toBe('DELETE')
  })

  it('converts encoded href params to {paramName} in path', () => {
    const entries = renderer.renderRouteEntries('app', schema.definitions['app'])
    const info = entries.find(e => e.titleKey === 'Info')
    expect(info?.path).toBe('/apps/{appId}')
  })

  it('preserves paths without params', () => {
    const entries = renderer.renderRouteEntries('app', schema.definitions['app'])
    const list = entries.find(e => e.titleKey === 'List')
    expect(list?.path).toBe('/apps')
  })

  it('sets hasRequestBody when link.schema has properties', () => {
    const entries = renderer.renderRouteEntries('app', schema.definitions['app'])
    const create = entries.find(e => e.titleKey === 'Create')
    expect(create?.hasRequestBody).toBe(true)
  })

  it('does not set hasRequestBody when there is no request schema', () => {
    const entries = renderer.renderRouteEntries('app', schema.definitions['app'])
    const info = entries.find(e => e.titleKey === 'Info')
    expect(info?.hasRequestBody).toBeUndefined()
  })

  it('includes links with rel=self', () => {
    const defWithSelf = {
      ...schema.definitions['app'],
      links: [{ title: 'Info', rel: 'self', href: '/apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fid)}', method: 'GET' }],
    }
    const entries = renderer.renderRouteEntries('app', defWithSelf)
    expect(entries.length).toBe(1)
    expect(entries[0].titleKey).toBe('Info')
    expect(entries[0].method).toBe('GET')
  })

  it('skips links without href or method', () => {
    const defNoHref = {
      ...schema.definitions['app'],
      links: [{ title: 'Broken' }],
    }
    expect(renderer.renderRouteEntries('app', defNoHref)).toEqual([])
  })

  it('returns empty array for definitions without links', () => {
    const noLinks = { properties: { id: { type: ['string'] as string[] } } }
    expect(renderer.renderRouteEntries('thing', noLinks)).toEqual([])
  })

  it('skips links with unsupported HTTP methods', () => {
    const defOptions = {
      ...schema.definitions['app'],
      links: [{ title: 'Options', method: 'OPTIONS', href: '/apps' }],
    }
    expect(renderer.renderRouteEntries('app', defOptions)).toEqual([])
  })

  it('handles disambiguated title keys', () => {
    const defAmbiguous = {
      ...schema.definitions['app'],
      links: [
        { title: 'List', method: 'GET', href: '/apps', rel: 'instances' },
        { title: 'List', method: 'POST', href: '/apps', schema: { properties: { name: { type: ['string'] } }, required: ['name'] } },
      ],
    }
    const entries = renderer.renderRouteEntries('app', defAmbiguous)
    const keys = entries.map(e => e.titleKey)
    expect(keys).toContain('List-get')
    expect(keys).toContain('List-post')
  })
})
