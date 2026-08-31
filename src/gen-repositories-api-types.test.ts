import {existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {dirname, join, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import {describe, expect, it, vi} from 'vitest'

import * as routes from './repositories-api/routes.js'
import {generateRepositoriesApiTypes, main} from './gen-repositories-api-types.js'
import type {RouteSchema} from './gen/normalize-data.js'
import {verifyTypes} from './gen/verify.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const schemas = JSON.parse(
  readFileSync(resolve(HERE, 'repositories-api/schemas.json'), 'utf8'),
) as Record<string, RouteSchema>

describe('repositories-api generation', () => {
  it('generates the pipeline repository method with its source-faithful response shape', () => {
    const types = generateRepositoriesApiTypes(routes, schemas)

    expect(types).toContain(`export interface GithubRepositoryInfoResult {
  name?: string
  full_name?: string
  id?: number
}`)
    expect(types).toContain(
      'info(pipelineIdentity: string): Promise<GithubRepositoryInfoResult>',
    )
    expect(types).not.toContain('export interface GithubRepositoryInfoOpts')
  })

  it('keeps the route separate from the Kolkrabbi repository path', () => {
    expect(routes.githubRepository.info).toEqual({
      method: 'GET',
      path: '/pipelines/{pipelineIdentity}/repo',
    })
    expect(routes.githubRepository.info.path).not.toContain('/repository')
  })

  it('keeps the generated package artifacts in sync with the curated source', () => {
    const generatedTypes = readFileSync(resolve(HERE, '../dist/repositories-api/types.d.ts'), 'utf8')
    const generatedRoutes = readFileSync(resolve(HERE, '../dist/repositories-api/routes.js'), 'utf8')
    const generatedRoutesDts = readFileSync(resolve(HERE, '../dist/repositories-api/routes.d.ts'), 'utf8')
    const sharedTypes = readFileSync(resolve(HERE, '../dist/types.d.ts'), 'utf8')

    expect(generatedTypes).toBe(generateRepositoriesApiTypes(routes, schemas))
    expect(generatedRoutes).toContain("path: '/pipelines/{pipelineIdentity}/repo'")
    expect(generatedRoutes).not.toContain('hasRequestBody')
    expect(generatedRoutesDts).toContain('export declare const githubRepository: Record<string, RouteDefinition>')
    expect(verifyTypes([
      {name: 'types.d.ts', content: sharedTypes},
      {name: 'repositories-api/routes.d.ts', content: generatedRoutesDts},
    ])).toEqual([])
  })

  it('does not replace publishable artifacts when route emission fails', async () => {
    const writeFile = vi.fn()

    await expect(main({
      routesPath: '/source/repositories-api/routes.ts',
      schemaPath: '/source/repositories-api/schemas.json',
      outPath: '/tmp/repositories-api-test/types.d.ts',
      readFile: path => path.endsWith('schemas.json') ? JSON.stringify(schemas) : '// partial routes',
      writeFile,
      importRoutes: async () => routes,
      emitTypedSource: () => ({
        jsPath: '/tmp/repositories-api-test/.tmp/repositories-api/routes.js',
        diagnostics: [{messageText: 'invalid route source'}],
      }),
      log: vi.fn(),
    })).rejects.toThrow('emitTypedSource returned 1 diagnostic(s):\ninvalid route source')
    expect(writeFile).not.toHaveBeenCalled()
  })

  it('writes all artifacts beside an injected outPath and copies the emitted routes exactly', async () => {
    const outputDir = mkdtempSync(join(tmpdir(), 'repositories-api-output-'))
    const outPath = join(outputDir, 'types.d.ts')
    const schemaPath = '/source/repositories-api/schemas.json'
    const emittedRoutes = '// emitted routes\n'
    let stagingDir = ''

    try {
      await main({
        routesPath: '/source/repositories-api/routes.ts',
        schemaPath,
        outPath,
        readFile: path => path === schemaPath ? JSON.stringify(schemas) : readFileSync(path, 'utf8'),
        writeFile: writeFileSync,
        importRoutes: async () => routes,
        emitTypedSource: options => {
          stagingDir = options.outDir
          const jsPath = join(stagingDir, 'repositories-api/routes.js')
          mkdirSync(dirname(jsPath), {recursive: true})
          writeFileSync(jsPath, emittedRoutes)
          return {jsPath, diagnostics: []}
        },
        log: vi.fn(),
      })

      expect(readFileSync(outPath, 'utf8')).toBe(generateRepositoriesApiTypes(routes, schemas))
      expect(readFileSync(join(outputDir, 'routes.js'), 'utf8')).toBe(emittedRoutes)
      expect(readFileSync(join(outputDir, 'routes.d.ts'), 'utf8')).toContain(
        'export declare const githubRepository: Record<string, RouteDefinition>',
      )
      expect(stagingDir.startsWith(tmpdir())).toBe(true)
      expect(relative(tmpdir(), stagingDir).startsWith('heroku-types-repositories-api-')).toBe(true)
      expect(existsSync(stagingDir)).toBe(false)
    } finally {
      rmSync(outputDir, {recursive: true, force: true})
    }
  })
})
