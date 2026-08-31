import {readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
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

    expect(types).toContain(`export interface GithubRepositoryGetRepositoryInformationForAPipelineResult {
  name?: string
  full_name?: string
  id?: number
}`)
    expect(types).toContain(
      'getRepositoryInformationForAPipeline(pipelineIdentity: string): Promise<GithubRepositoryGetRepositoryInformationForAPipelineResult>',
    )
    expect(types).not.toContain('export interface GithubRepositoryGetRepositoryInformationForAPipelineOpts')
  })

  it('keeps the route separate from the Kolkrabbi repository path', () => {
    expect(routes.githubRepository.getRepositoryInformationForAPipeline).toEqual({
      method: 'GET',
      path: '/pipelines/{pipelineIdentity}/repo',
    })
    expect(routes.githubRepository.getRepositoryInformationForAPipeline.path).not.toContain('/repository')
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
})
