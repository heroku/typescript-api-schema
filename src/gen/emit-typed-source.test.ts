import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { emitTypedSource } from './emit-typed-source.js'

function writeSource(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, content)
}

describe('emitTypedSource', () => {
  let workDir: string

  beforeEach(() => {
    workDir = mkdtempSync(join(tmpdir(), 'emit-typed-source-'))
  })

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  it('emits a .js file alongside a .d.ts file from a typed source', () => {
    const srcDir = join(workDir, 'src')
    const outDir = join(workDir, 'out')
    const sourcePath = join(srcDir, 'data.ts')
    writeSource(sourcePath, `export const greet = { hello: 'world' } as const\n`)

    const result = emitTypedSource({ sourcePath, rootDir: srcDir, outDir })

    expect(existsSync(result.jsPath)).toBe(true)
    expect(existsSync(result.dtsPath)).toBe(true)
    expect(result.diagnostics).toEqual([])
  })

  it('preserves the source file structure under outDir relative to rootDir', () => {
    const srcDir = join(workDir, 'src')
    const outDir = join(workDir, 'out')
    const sourcePath = join(srcDir, 'nested', 'routes.ts')
    writeSource(sourcePath, `export const x = 1\n`)

    const result = emitTypedSource({ sourcePath, rootDir: srcDir, outDir })

    expect(result.jsPath).toBe(join(outDir, 'nested', 'routes.js'))
    expect(result.dtsPath).toBe(join(outDir, 'nested', 'routes.d.ts'))
  })

  it('passes a banner through to both emitted files when provided', () => {
    const srcDir = join(workDir, 'src')
    const outDir = join(workDir, 'out')
    const sourcePath = join(srcDir, 'r.ts')
    writeSource(sourcePath, `export const x = 1\n`)

    const result = emitTypedSource({
      sourcePath,
      rootDir: srcDir,
      outDir,
      banner: '/* GENERATED */\n',
    })

    expect(readFileSync(result.jsPath, 'utf8').startsWith('/* GENERATED */\n')).toBe(true)
    expect(readFileSync(result.dtsPath, 'utf8').startsWith('/* GENERATED */\n')).toBe(true)
  })

  it('returns diagnostics and writes nothing when the source has type errors', () => {
    const srcDir = join(workDir, 'src')
    const outDir = join(workDir, 'out')
    const sourcePath = join(srcDir, 'broken.ts')
    writeSource(sourcePath, `export const x: number = 'not a number'\n`)

    const result = emitTypedSource({ sourcePath, rootDir: srcDir, outDir })

    expect(result.diagnostics.length).toBeGreaterThan(0)
    expect(existsSync(result.jsPath)).toBe(false)
    expect(existsSync(result.dtsPath)).toBe(false)
  })

  it('round-trips a value-exporting source: emitted .js can be imported and matches the source', async () => {
    const srcDir = join(workDir, 'src')
    const outDir = join(workDir, 'out')
    const sourcePath = join(srcDir, 'fixtures.ts')
    writeSource(
      sourcePath,
      `export const sample = { a: 'one', b: { method: 'GET', path: '/x' } } as const\n`,
    )

    const result = emitTypedSource({ sourcePath, rootDir: srcDir, outDir })
    const mod = await import(result.jsPath)

    expect(mod.sample).toEqual({ a: 'one', b: { method: 'GET', path: '/x' } })
  })

  it('does not emit transitive imports — only the source file', () => {
    const srcDir = join(workDir, 'src')
    const outDir = join(workDir, 'out')
    const helperPath = join(srcDir, 'helpers.ts')
    const sourcePath = join(srcDir, 'routes.ts')
    writeSource(helperPath, `export interface Route { method: string; path: string }\n`)
    writeSource(
      sourcePath,
      `import type { Route } from './helpers.js'\nexport const r: Route = { method: 'GET', path: '/x' }\n`,
    )

    const result = emitTypedSource({ sourcePath, rootDir: srcDir, outDir })

    expect(existsSync(result.jsPath)).toBe(true)
    expect(existsSync(join(outDir, 'helpers.js'))).toBe(false)
    expect(existsSync(join(outDir, 'helpers.d.ts'))).toBe(false)
  })
})
