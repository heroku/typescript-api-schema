import { readFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'
import { favorite } from './dashboard-backend/routes.js'
import { generateDashboardBackendTypes, main, type MainDeps } from './gen-dashboard-backend-types.js'

const schemas = JSON.parse(
  readFileSync(new URL('./dashboard-backend/schemas.json', import.meta.url), 'utf8'),
)

describe('generateDashboardBackendTypes', () => {
  it('emits the favorite types and exact client method signatures', () => {
    const out = generateDashboardBackendTypes({ favorite }, schemas)

    expect(out).toMatch(/export type FavoriteListResult = Array<\{\s+id: string\s+resource_id: string\s+resource_name: string\s+type: string\s+\}>/)
    expect(out).toMatch(/export interface FavoriteCreateOpts \{\s+resource_id: string\s+type: string\s+\}/)
    expect(out).toMatch(/export interface FavoriteCreateResult \{\s+id: string\s+resource_id: string\s+type: string\s+\}/)
    expect(out).not.toMatch(/export interface FavoriteCreateResult \{[^}]*resource_name/s)
    expect(out).toContain('list(query: {')
    expect(out).toMatch(/list\(query: \{\s+type\?: string\s+\}\): Promise<FavoriteListResult>/)
    expect(out).toContain('create(requestBody: FavoriteCreateOpts): Promise<FavoriteCreateResult | void>')
    expect(out).toContain('delete(id: string): Promise<void>')
  })
})

describe('main', () => {
  it('emits typed route source and writes types.d.ts and routes.d.ts', async () => {
    const deps: Partial<MainDeps> = {
      writeFile: vi.fn(),
      emitTypedSource: vi.fn().mockReturnValue({
        jsPath: '/fake/dist/dashboard-backend/routes.js',
        diagnostics: [],
      }),
      log: vi.fn(),
    }

    await main(deps)

    expect(deps.emitTypedSource).toHaveBeenCalledWith(expect.objectContaining({
      sourcePath: expect.stringContaining('dashboard-backend/routes.ts'),
    }))
    expect(deps.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('dashboard-backend/types.d.ts'),
      expect.stringContaining('HerokuClient'),
    )
    expect(deps.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('dashboard-backend/routes.d.ts'),
      expect.stringContaining('favorite'),
    )
  })
})
