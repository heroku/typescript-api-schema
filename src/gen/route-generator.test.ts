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
  it('produces valid JS with export const routes', () => {
    const js = generateRoutesJS(schema)
    expect(js).toMatch(/^export const routes = \{/)
  })

  it('uses camelCase resource keys', () => {
    const js = generateRoutesJS(schema)
    expect(js).toContain('"app"')
  })

  it('uses camelCase method keys', () => {
    const js = generateRoutesJS(schema)
    expect(js).toContain('"create"')
    expect(js).toContain('"info"')
    expect(js).toContain('"list"')
    expect(js).toContain('"delete"')
  })

  it('includes correct method and path for each route', () => {
    const js = generateRoutesJS(schema)
    const routes = parseRoutes(js)
    expect(routes.app.create).toEqual({ method: 'POST', path: '/apps', hasRequestBody: true })
    expect(routes.app.info).toEqual({ method: 'GET', path: '/apps/{appId}' })
    expect(routes.app.list).toEqual({ method: 'GET', path: '/apps' })
    expect(routes.app.delete).toEqual({ method: 'DELETE', path: '/apps/{appId}' })
  })

  it('skips resources with no links', () => {
    const js = generateRoutesJS(schema)
    expect(js).not.toContain('configVar')
  })

  it('is parseable as a JS module', () => {
    const js = generateRoutesJS(schema)
    // Strip the export keyword and evaluate as an expression
    const expression = js.replace('export const routes = ', '')
    expect(() => JSON.parse(expression)).not.toThrow()
  })
})

describe('generateRoutesDTS', () => {
  it('exports RouteDefinition interface', () => {
    const dts = generateRoutesDTS()
    expect(dts).toContain('export interface RouteDefinition')
  })

  it('exports routes declaration', () => {
    const dts = generateRoutesDTS()
    expect(dts).toContain('export declare const routes: Record<string, Record<string, RouteDefinition>>')
  })
})

function parseRoutes(js: string): Record<string, Record<string, Record<string, unknown>>> {
  const expression = js.replace('export const routes = ', '')
  return JSON.parse(expression)
}
