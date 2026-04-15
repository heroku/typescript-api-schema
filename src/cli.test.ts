import { describe, it, expect } from 'vitest'
import { parseArgs } from './cli.js'

describe('parseArgs', () => {
  it('returns defaults when no args provided', () => {
    const options = parseArgs([])
    expect(options).toEqual({
      variant: '3.sdk',
      baseUrl: 'https://api.heroku.com/schema',
      output: 'heroku-3.sdk.d.ts',
      help: false,
    })
  })

  it('derives output filename from custom variant', () => {
    const options = parseArgs(['--variant', '3.platform'])
    expect(options.variant).toBe('3.platform')
    expect(options.output).toBe('heroku-3.platform.d.ts')
  })

  it('uses explicit --output over variant-derived default', () => {
    const options = parseArgs(['--variant', '3.platform', '--output', 'custom.d.ts'])
    expect(options.output).toBe('custom.d.ts')
  })

  it('parses --base-url', () => {
    const options = parseArgs(['--base-url', 'http://localhost:3000/schema'])
    expect(options.baseUrl).toBe('http://localhost:3000/schema')
  })

  it('parses all flags together', () => {
    const options = parseArgs([
      '--variant', '3.beta',
      '--base-url', 'http://localhost:3000/schema',
      '--output', 'out.d.ts',
    ])
    expect(options).toEqual({
      variant: '3.beta',
      baseUrl: 'http://localhost:3000/schema',
      output: 'out.d.ts',
      help: false,
    })
  })

  it('parses --help', () => {
    const options = parseArgs(['--help'])
    expect(options.help).toBe(true)
  })

  it('throws on unknown flags', () => {
    expect(() => parseArgs(['--foo'])).toThrow('Unknown option: --foo')
  })

  it('throws when --variant is missing a value', () => {
    expect(() => parseArgs(['--variant'])).toThrow('--variant requires a value')
  })

  it('throws when --base-url is missing a value', () => {
    expect(() => parseArgs(['--base-url'])).toThrow('--base-url requires a value')
  })

  it('throws when --output is missing a value', () => {
    expect(() => parseArgs(['--output'])).toThrow('--output requires a value')
  })
})
