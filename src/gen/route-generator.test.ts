import { describe, it, expect } from 'vitest'
import { generateRoutesJS, generateRoutesDTS } from './route-generator.js'
import type { HerokuSchema } from './template.js'

const schema: HerokuSchema = {
  definitions: {
    app: {
      description: 'An app represents a program.',
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
    'config-var': {
      type: ['object'],
      // no links
    },
  },
}

describe('generateRoutesJS', () => {
  it('emits per-resource named exports', () => {
    const js = generateRoutesJS(schema)
    expect(js).toContain('export const app = {')
  })

  it('does not emit a single routes object', () => {
    const js = generateRoutesJS(schema)
    expect(js).not.toContain('export const routes')
  })

  it('includes correct method and path for each route', () => {
    const js = generateRoutesJS(schema)
    const app = parseExport(js, 'app')
    expect(app.create).toEqual({ method: 'POST', path: '/apps', hasRequestBody: true })
    expect(app.info).toEqual({ method: 'GET', path: '/apps/{appId}' })
    expect(app.list).toEqual({ method: 'GET', path: '/apps' })
    expect(app.delete).toEqual({ method: 'DELETE', path: '/apps/{appId}' })
  })

  it('skips resources with no links', () => {
    const js = generateRoutesJS(schema)
    expect(js).not.toContain('configVar')
  })
})

describe('generateRoutesDTS', () => {
  it('exports RouteDefinition interface', () => {
    const dts = generateRoutesDTS(schema)
    expect(dts).toContain('export interface RouteDefinition')
  })

  it('emits per-resource declarations', () => {
    const dts = generateRoutesDTS(schema)
    expect(dts).toContain('export declare const app: Record<string, RouteDefinition>')
  })

  it('skips resources with no links', () => {
    const dts = generateRoutesDTS(schema)
    expect(dts).not.toContain('configVar')
  })
})

function parseExport(js: string, name: string): Record<string, Record<string, unknown>> {
  const re = new RegExp(`export const ${name} = (\\{[\\s\\S]*?\\n\\})`)
  const match = js.match(re)
  if (!match) throw new Error(`Export "${name}" not found`)
  return JSON.parse(match[1])
}
