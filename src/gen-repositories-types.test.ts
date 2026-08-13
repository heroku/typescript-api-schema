import { describe, it, expect, vi } from 'vitest'
import { generateRepositoriesTypes, main, type MainDeps } from './gen-repositories-types.js'
import { account, appLink, pipeline, pipelineRepository, githubTarball } from './repositories/routes.js'

const schemas = JSON.parse(
  (await import('node:fs')).readFileSync(new URL('./repositories/schemas.json', import.meta.url), 'utf8'),
)

describe('generateRepositoriesTypes', () => {
  it('emits the generated banner', () => {
    expect(generateRepositoriesTypes({}, {})).toContain('NOTE: the contents of this file are generated.')
  })

  it('emits HerokuClient grouped by resource', () => {
    const out = generateRepositoriesTypes({ account, appLink, pipeline, pipelineRepository, githubTarball }, schemas)
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toContain('account: {')
    expect(out).toContain('appLink: {')
    expect(out).toContain('pipeline: {')
    expect(out).toContain('pipelineRepository: {')
    expect(out).toContain('githubTarball: {')
  })
})

describe('main', () => {
  it('writes routes.js, routes.d.ts, and types.d.ts', async () => {
    const deps = {
      routesPath: '/fake/routes.ts',
      schemaPath: '/fake/schemas.json',
      outPath: '/fake/types.d.ts',
      readFile: vi.fn().mockReturnValue('{}'),
      writeFile: vi.fn(),
      importRoutes: vi.fn().mockResolvedValue({
        account,
        appLink,
        pipeline,
        pipelineRepository,
        githubTarball,
      }),
      emitTypedSource: vi.fn().mockReturnValue({
        jsPath: '/fake/dist/repositories/routes.js',
        diagnostics: [],
      }),
      log: vi.fn(),
    }
    
    await main(deps)

    expect(deps.emitTypedSource).toHaveBeenCalledWith(expect.objectContaining({ sourcePath: expect.stringContaining('routes.ts') }))
    expect(deps.writeFile).toHaveBeenCalledWith(expect.stringContaining('types.d.ts'), expect.stringContaining('HerokuClient'))
    expect(deps.writeFile).toHaveBeenCalledWith(expect.stringContaining('routes.d.ts'), expect.stringContaining('account'))
  })
})
