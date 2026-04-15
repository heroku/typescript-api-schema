#!/usr/bin/env node

import { writeFileSync } from 'node:fs'
import { fetchSchema } from './gen/schema.js'
import { generateTypes } from './gen/generator.js'
import type { HerokuSchema } from './gen/template.js'

interface CliOptions {
  variant?: string
  baseUrl?: string
  output: string
  help: boolean
}

const USAGE = `Usage: heroku-types [options]

Options:
  --variant <variant>   Schema variant (default: 3.sdk)
  --base-url <url>      Schema endpoint (default: https://api.heroku.com/schema)
  --output <path>       Output file path (default: heroku-<variant>.d.ts)
  --help                Show this help message`

export function parseArgs(argv: string[]): CliOptions {
  let variant
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

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2))

    if (options.help) {
      console.error(USAGE)
      process.exit(0)
    }

    const schema = await fetchSchema(options.baseUrl, options.variant) as HerokuSchema
    const types = generateTypes(schema)
    writeFileSync(options.output, types)
    console.error(`Wrote ${options.output}`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
