import { describe, it, expect, vi } from 'vitest'
import { main, formatVerifyErrors, type MainDeps } from './cli.js'
import { DEFAULT_SCHEMA_VARIANT } from './gen/schema.js'
import { GENERATED_CONTENT_PREAMBLE } from './gen/generator.js'

function makeDeps(overrides: Partial<MainDeps> & { argv: string[] }): MainDeps {
  return {
    fetchSchema: overrides.fetchSchema ?? vi.fn().mockResolvedValue({ definitions: {} }),
    generateTypes: overrides.generateTypes ?? vi.fn().mockReturnValue('// types'),
    generateRoutes: overrides.generateRoutes ?? vi.fn().mockReturnValue({ js: '// routes', dts: '// routes dts' }),
    verifyTypes: overrides.verifyTypes ?? vi.fn().mockReturnValue([]),
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
    expect(deps.writeFile).toHaveBeenCalledWith(`types/heroku-${DEFAULT_SCHEMA_VARIANT}.d.ts`, GENERATED_CONTENT_PREAMBLE + '// types')
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

    expect(deps.writeFile).toHaveBeenCalledWith('types/heroku-3.platform.d.ts', GENERATED_CONTENT_PREAMBLE + '// types')
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

  it('writes route registry files', async () => {
    const deps = makeDeps({ argv: argv() })
    await main(deps)

    expect(deps.writeFile).toHaveBeenCalledWith('types/routes.js', GENERATED_CONTENT_PREAMBLE + '// routes')
    expect(deps.writeFile).toHaveBeenCalledWith('types/routes.d.ts', GENERATED_CONTENT_PREAMBLE + '// routes dts')
  })

  it('verifies generated types before writing', async () => {
    const deps = makeDeps({ argv: argv() })
    await main(deps)

    expect(deps.verifyTypes).toHaveBeenCalledWith('// types')
    expect(deps.writeFile).toHaveBeenCalled()
  })

  it('does not write file when verification fails', async () => {
    const deps = makeDeps({
      argv: argv(),
      verifyTypes: vi.fn().mockReturnValue([
        { message: "Cannot find name 'Foo'.", line: 10, column: 3 },
      ]),
    })
    await main(deps)

    expect(deps.writeFile).not.toHaveBeenCalled()
    expect(deps.exit).toHaveBeenCalledWith(1)
  })

  it('logs formatted verification errors', async () => {
    const deps = makeDeps({
      argv: argv(),
      verifyTypes: vi.fn().mockReturnValue([
        { message: "Cannot find name 'Foo'.", line: 10, column: 3 },
        { message: "';' expected.", line: 25, column: 8 },
      ]),
    })
    await main(deps)

    expect(deps.log).toHaveBeenCalledWith(expect.stringContaining('Verification failed with 2 error(s)'))
    expect(deps.log).toHaveBeenCalledWith(expect.stringContaining("Line 10, Column 3: Cannot find name 'Foo'."))
    expect(deps.log).toHaveBeenCalledWith(expect.stringContaining("Line 25, Column 8: ';' expected."))
  })
})

describe('formatVerifyErrors', () => {
  it('formats errors with line and column', () => {
    const result = formatVerifyErrors([
      { message: 'some error', line: 5, column: 12 },
    ])
    expect(result).toBe('Verification failed with 1 error(s):\n  Line 5, Column 12: some error')
  })

  it('formats errors without location', () => {
    const result = formatVerifyErrors([
      { message: 'global error' },
    ])
    expect(result).toBe('Verification failed with 1 error(s):\n  global error')
  })
})
