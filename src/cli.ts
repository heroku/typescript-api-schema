#!/usr/bin/env node

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fetchSchema, DEFAULT_SCHEMA_VARIANT } from './gen/schema.js'
import { generateTypes, GENERATED_CONTENT_PREAMBLE } from './gen/generator.js'
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
  verifyTypes: (content: string) => VerifyError[]
  writeFile: (path: string, content: string) => void
  log: (message: string) => void
  exit: (code: number) => void
}

const defaultDeps: MainDeps = {
  argv: process.argv,
  fetchSchema,
  generateTypes,
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
  const { argv, fetchSchema, generateTypes, verifyTypes, writeFile, log, exit } = { ...defaultDeps, ...deps }

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

    const outputDir = 'types'
    mkdirSync(outputDir, { recursive: true })
    const output = join(outputDir, `heroku-${options.variant}.d.ts`)
    const fileContent = GENERATED_CONTENT_PREAMBLE + types

    writeFile(output, fileContent)
    log(`Wrote ${output}`)
  } catch (error) {
    log(error instanceof Error ? error.message : String(error))
    exit(1)
  }
}

main()
