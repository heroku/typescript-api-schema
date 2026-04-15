import { describe, it, expect, vi } from 'vitest'
import { main, type MainDeps } from './cli.js'
import { DEFAULT_SCHEMA_VARIANT } from './gen/schema.js'

function makeDeps(overrides: Partial<MainDeps> & { argv: string[] }): MainDeps {
  return {
    fetchSchema: overrides.fetchSchema ?? vi.fn().mockResolvedValue({ definitions: {} }),
    generateTypes: overrides.generateTypes ?? vi.fn().mockReturnValue('// types'),
    writeFile: overrides.writeFile ?? vi.fn(),
    log: overrides.log ?? vi.fn(),
    exit: overrides.exit ?? vi.fn(),
    ...overrides,
  }
}

function argv(...args: string[]) {
  return ['node', 'cli.js', ...args]
}

describe('main', () => {
  it('fetches schema and writes output with defaults', async () => {
    const deps = makeDeps({ argv: argv() })
    await main(deps)

    expect(deps.fetchSchema).toHaveBeenCalledWith(undefined, DEFAULT_SCHEMA_VARIANT)
    expect(deps.generateTypes).toHaveBeenCalled()
    expect(deps.writeFile).toHaveBeenCalledWith(`heroku-${DEFAULT_SCHEMA_VARIANT}.d.ts`, '// types')
    expect(deps.exit).not.toHaveBeenCalled()
  })

  it('passes variant and base-url to fetchSchema', async () => {
    const deps = makeDeps({ argv: argv('--variant', '3.platform', '--base-url', 'http://localhost/schema') })
    await main(deps)

    expect(deps.fetchSchema).toHaveBeenCalledWith('http://localhost/schema', '3.platform')
  })

  it('derives output filename from variant', async () => {
    const deps = makeDeps({ argv: argv('--variant', '3.platform') })
    await main(deps)

    expect(deps.writeFile).toHaveBeenCalledWith('heroku-3.platform.d.ts', '// types')
  })

  it('uses explicit --output over variant-derived default', async () => {
    const deps = makeDeps({ argv: argv('--variant', '3.platform', '--output', 'custom.d.ts') })
    await main(deps)

    expect(deps.writeFile).toHaveBeenCalledWith('custom.d.ts', '// types')
  })

  it('prints usage and exits 0 on --help', async () => {
    const deps = makeDeps({ argv: argv('--help') })
    await main(deps)

    expect(deps.log).toHaveBeenCalledWith(expect.stringContaining('Usage: heroku-types'))
    expect(deps.exit).toHaveBeenCalledWith(0)
    expect(deps.writeFile).not.toHaveBeenCalled()
  })

  it('exits 1 on unknown flags', async () => {
    const deps = makeDeps({ argv: argv('--foo') })
    await main(deps)

    expect(deps.log).toHaveBeenCalledWith('Unknown option: --foo')
    expect(deps.exit).toHaveBeenCalledWith(1)
  })

  it('exits 1 when --variant is missing a value', async () => {
    const deps = makeDeps({ argv: argv('--variant') })
    await main(deps)

    expect(deps.log).toHaveBeenCalledWith('--variant requires a value')
    expect(deps.exit).toHaveBeenCalledWith(1)
  })

  it('exits 1 when fetchSchema fails', async () => {
    const deps = makeDeps({
      argv: argv(),
      fetchSchema: vi.fn().mockRejectedValue(new Error('network error')),
    })
    await main(deps)

    expect(deps.log).toHaveBeenCalledWith('network error')
    expect(deps.exit).toHaveBeenCalledWith(1)
  })
})
