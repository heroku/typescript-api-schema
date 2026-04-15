#!/usr/bin/env node

import { writeFileSync } from 'node:fs'
import { fetchSchema, DEFAULT_SCHEMA_VARIANT } from './gen/schema.js'
import { generateTypes } from './gen/generator.js'
import type { HerokuSchema } from './gen/template.js'

interface CliOptions {
  variant?: string
  baseUrl?: string
  output: string
  help: boolean
}

export interface MainDeps {
  argv: string[]
  fetchSchema: (baseUrl?: string, variant?: string) => Promise<unknown>
  generateTypes: (schema: HerokuSchema) => string
  writeFile: (path: string, content: string) => void
  log: (message: string) => void
  exit: (code: number) => void
}

const defaultDeps: MainDeps = {
  argv: process.argv,
  fetchSchema,
  generateTypes,
  writeFile: writeFileSync,
  log: (message: string) => console.error(message),
  exit: (code: number) => process.exit(code),
}

const USAGE = `Usage: heroku-types [options]

Options:
  --variant <variant>   Schema variant (default: 3.sdk)
  --base-url <url>      Schema endpoint (default: https://api.heroku.com/schema)
  --output <path>       Output file path (default: heroku-<variant>.d.ts)
  --help                Show this help message`

function parseArgs(argv: string[]): CliOptions {
  let variant = DEFAULT_SCHEMA_VARIANT
  let baseUrl
  let output: string | undefined
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
      case '--output':
        if (i + 1 >= argv.length) throw new Error('--output requires a value')
        output = argv[++i]
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
    output: output ?? `heroku-${variant}.d.ts`,
    help,
  }
}

export async function main(deps: Partial<MainDeps> = {}) {
  const { argv, fetchSchema, generateTypes, writeFile, log, exit } = { ...defaultDeps, ...deps }

  try {
    const options = parseArgs(argv.slice(2))

    if (options.help) {
      log(USAGE)
      exit(0)
      return
    }

    const schema = await fetchSchema(options.baseUrl, options.variant) as HerokuSchema
    const types = generateTypes(schema)
    writeFile(options.output, types)
    log(`Wrote ${options.output}`)
  } catch (error) {
    log(error instanceof Error ? error.message : String(error))
    exit(1)
  }
}

main()
