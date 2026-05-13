import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { verifyTypes } from './verify.js'

describe('verifyTypes', () => {
  it('returns no errors for valid interface declarations', () => {
    const content = `
export interface App {
  id: string
  name: string
}

export interface Account {
  email: string
  verified: boolean
}
`
    expect(verifyTypes(content)).toEqual([])
  })

  it('returns no errors for type aliases', () => {
    const content = `export type ConfigVar = Record<string, string | null>\n`
    expect(verifyTypes(content)).toEqual([])
  })

  it('returns no errors for complex nested types with Promise', () => {
    const content = `
export interface App {
  id: string
  name: string
  region?: {
    id: string
    name: string
  }
  features?: Array<string>
}

export interface AppCreateOpts {
  name: string
  region?: string
}

export interface HerokuClient {
  app: {
    create(requestBody: AppCreateOpts): Promise<App>
    info(appIdentity: string): Promise<App>
    list(): Promise<App[]>
  }
}
`
    expect(verifyTypes(content)).toEqual([])
  })

  it('returns no errors for empty content', () => {
    expect(verifyTypes('')).toEqual([])
  })

  it('returns errors for syntax errors', () => {
    const content = `
export interface App {
  id: string
  name: }
`
    const errors = verifyTypes(content)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('returns errors for unresolved type references', () => {
    const content = `
export interface App {
  account: NonExistentType
}
`
    const errors = verifyTypes(content)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].message).toContain('NonExistentType')
  })

  it('reports line and column numbers for errors', () => {
    const content = `export interface App {
  id: string
  broken: ???
}
`
    const errors = verifyTypes(content)
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].line).toBeTypeOf('number')
    expect(errors[0].column).toBeTypeOf('number')
  })

  it('returns errors for invalid generic syntax', () => {
    const content = `
export interface App {
  items: Array<>
}
`
    const errors = verifyTypes(content)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('resolves cross-file imports when given multiple files', () => {
    const errors = verifyTypes([
      { name: 'types.d.ts', content: `export interface RouteDefinition { method: 'GET'; path: string }\n` },
      { name: '3.sdk/routes.d.ts', content: `import type { RouteDefinition } from '../types'\nexport declare const app: Record<string, RouteDefinition>\n` },
    ])
    expect(errors).toEqual([])
  })

  it('reports unresolved cross-file imports', () => {
    const errors = verifyTypes([
      { name: '3.sdk/routes.d.ts', content: `import type { RouteDefinition } from '../types'\nexport declare const app: Record<string, RouteDefinition>\n` },
    ])
    expect(errors.length).toBeGreaterThan(0)
    expect(errors[0].file).toBe('3.sdk/routes.d.ts')
  })
})
