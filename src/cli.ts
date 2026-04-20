#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fetchSchema, DEFAULT_SCHEMA_VARIANT } from './gen/schema.js'
import { generateTypes, GENERATED_CONTENT_PREAMBLE } from './gen/generator.js'
import { generateRoutesJS, generateRoutesDTS } from './gen/route-generator.js'
import { verifyTypes, type VerifyError } from './gen/verify.js'
import type { HerokuSchema } from './gen/template.js'

interface CliOptions {
  variant?: string
  baseUrl?: string
  help: boolean
}

export interface MainDeps {
  argv: string[]
  fetchSchema: (baseUrl?: string, variant?: string) => Promise<unknown>
  generateTypes: (schema: HerokuSchema) => string
  generateRoutes: (schema: HerokuSchema) => { js: string; dts: string }
  verifyTypes: (content: string) => VerifyError[]
  writeFile: (path: string, content: string) => void
  log: (message: string) => void
  exit: (code: number) => void
}

const defaultDeps: MainDeps = {
  argv: process.argv,
  fetchSchema,
  generateTypes,
  generateRoutes: (schema: HerokuSchema) => ({
    js: generateRoutesJS(schema),
    dts: generateRoutesDTS(),
  }),
  verifyTypes,
  writeFile: writeFileSync,
  log: (message: string) => console.error(message),
  exit: (code: number) => process.exit(code),
}

const USAGE = `Usage: heroku-types [options]

Options:
  --variant <variant>   Schema variant (default: 3.sdk)
  --base-url <url>      Schema endpoint (default: https://api.heroku.com/schema)
  --help                Show this help message`

function parseArgs(argv: string[]): CliOptions {
  let variant = DEFAULT_SCHEMA_VARIANT
  let baseUrl
  let help = false

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    switch (arg) {
      case '--variant':
        if (i + 1 >= argv.length) throw new Error('--variant requires a value')
        variant = argv[++i]
        break
      case '--base-url':
        if (i + 1 >= argv.length) throw new Error('--base-url requires a value')
        baseUrl = argv[++i]
        break
      case '--help':
        help = true
        break
      default:
        throw new Error(`Unknown option: ${arg}`)
    }
  }

  return {
    variant,
    baseUrl,
    help,
  }
}

export function formatVerifyErrors(errors: VerifyError[]): string {
  const header = `Verification failed with ${errors.length} error(s):\n`
  const details = errors.map(e => {
    const location = e.line != null ? `  Line ${e.line}, Column ${e.column}: ` : '  '
    return `${location}${e.message}`
  }).join('\n')
  return header + details
}

export async function main(deps: Partial<MainDeps> = {}) {
  const { argv, fetchSchema, generateTypes, generateRoutes, verifyTypes, writeFile, log, exit } = { ...defaultDeps, ...deps }

  try {
    const options = parseArgs(argv.slice(2))

    if (options.help) {
      log(USAGE)
      exit(0)
      return
    }

    const schema = await fetchSchema(options.baseUrl, options.variant) as HerokuSchema
    const types = generateTypes(schema)

    const errors = verifyTypes(types)
    if (errors.length > 0) {
      log(formatVerifyErrors(errors))
      exit(1)
      return
    }

    const routes = generateRoutes(schema)

    const outputDir = 'types'
    mkdirSync(outputDir, { recursive: true })

    const typesOutput = join(outputDir, `heroku-${options.variant}.d.ts`)
    writeFile(typesOutput, GENERATED_CONTENT_PREAMBLE + types)
    log(`Wrote ${typesOutput}`)

    const routesJsOutput = join(outputDir, 'routes.js')
    writeFile(routesJsOutput, GENERATED_CONTENT_PREAMBLE + routes.js)
    log(`Wrote ${routesJsOutput}`)

    const routesDtsOutput = join(outputDir, 'routes.d.ts')
    writeFile(routesDtsOutput, GENERATED_CONTENT_PREAMBLE + routes.dts)
    log(`Wrote ${routesDtsOutput}`)
  } catch (error) {
    log(error instanceof Error ? error.message : String(error))
    exit(1)
  }
}

main()
