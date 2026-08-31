/**
 * Code generator for the focused `repositories-api` client surface.
 *
 * The API is served through api.heroku.com under its own Accept variant. Keep
 * it separate from both the Platform `3.sdk` and Kolkrabbi `repositories`
 * clients so consumers can select the correct host and media type.
 */
import {mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs'
import {join, dirname, resolve} from 'node:path'
import {tmpdir} from 'node:os'
import {fileURLToPath} from 'node:url'
import ts from 'typescript'

import {emitTypes} from './gen/ts-emit.js'
import {emitTypedSource as defaultEmitTypedSource, type EmitTypedSourceResult} from './gen/emit-typed-source.js'
import {GENERATED_CONTENT_PREAMBLE} from './gen/generator.js'
import {normalizeData, type RouteDef, type RouteSchema} from './gen/normalize-data.js'
import {generateRoutesDTSForResources} from './gen/route-generator.js'

const BANNER = '/**\n * NOTE: the contents of this file are generated. Do not modify this file.\n */\n'

export function generateRepositoriesApiTypes(
  routesByResource: Record<string, Record<string, RouteDef>>,
  schemas: Record<string, RouteSchema>,
): string {
  return `${BANNER}\n${emitTypes(normalizeData(routesByResource, schemas), {emitResourceShapes: false})}`
}

interface MainDeps {
  routesPath: string
  schemaPath: string
  outPath: string
  readFile: (path: string) => string
  writeFile: (path: string, content: string) => void
  importRoutes: (path: string) => Promise<Record<string, unknown>>
  emitTypedSource: (options: {sourcePath: string; rootDir: string; outDir: string; banner?: string}) => EmitTypedSourceResult
  log: (message: string) => void
}

const HERE = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(HERE, '../dist')
const REPOSITORIES_API_DIST = resolve(DIST, 'repositories-api')

const defaultDeps: MainDeps = {
  routesPath: resolve(HERE, 'repositories-api/routes.ts'),
  schemaPath: resolve(HERE, 'repositories-api/schemas.json'),
  outPath: resolve(REPOSITORIES_API_DIST, 'types.d.ts'),
  readFile: path => readFileSync(path, 'utf8'),
  writeFile: writeFileSync,
  importRoutes: path => import(path),
  emitTypedSource: defaultEmitTypedSource,
  log: message => console.log(message),
}

export async function main(deps: Partial<MainDeps> = {}) {
  const options = {...defaultDeps, ...deps}
  mkdirSync(dirname(options.outPath), {recursive: true})
  const routesModule = await options.importRoutes(options.routesPath)
  const routesByResource: Record<string, Record<string, RouteDef>> = {}
  for (const [key, value] of Object.entries(routesModule)) {
    if (key !== 'default') routesByResource[key] = value as Record<string, RouteDef>
  }

  const schemas = JSON.parse(options.readFile(options.schemaPath)) as Record<string, RouteSchema>
  const generatedTypes = generateRepositoriesApiTypes(routesByResource, schemas)
  const outputDir = dirname(options.outPath)
  const temporaryOutDir = mkdtempSync(join(tmpdir(), 'heroku-types-repositories-api-'))

  try {
    const emitted = options.emitTypedSource({
      sourcePath: options.routesPath,
      rootDir: HERE,
      outDir: temporaryOutDir,
      banner: GENERATED_CONTENT_PREAMBLE,
    })
    if (emitted.diagnostics.length > 0) {
      const summary = emitted.diagnostics
        .map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
        .join('\n')
      throw new Error(`emitTypedSource returned ${emitted.diagnostics.length} diagnostic(s):\n${summary}`)
    }

    const resources = Object.keys(routesByResource)
    options.writeFile(options.outPath, generatedTypes)
    options.writeFile(resolve(outputDir, 'routes.js'), options.readFile(emitted.jsPath))
    options.writeFile(
      resolve(outputDir, 'routes.d.ts'),
      GENERATED_CONTENT_PREAMBLE + generateRoutesDTSForResources(resources),
    )
    options.log(`Wrote ${options.outPath}`)
  } finally {
    rmSync(temporaryOutDir, {recursive: true, force: true})
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main()
}
