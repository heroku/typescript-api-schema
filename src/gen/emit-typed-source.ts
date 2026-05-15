import ts from 'typescript'
import { dirname, join, relative } from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'

export interface EmitTypedSourceOptions {
  sourcePath: string
  rootDir: string
  outDir: string
  banner?: string
}

export interface EmitTypedSourceResult {
  jsPath: string
  diagnostics: ts.Diagnostic[]
}

export function emitTypedSource(options: EmitTypedSourceOptions): EmitTypedSourceResult {
  const { sourcePath, rootDir, outDir, banner = '' } = options

  const compilerOptions: ts.CompilerOptions = {
    declaration: false,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    rootDir,
    outDir,
    noEmit: false,
    noEmitOnError: true,
  }

  const program = ts.createProgram([sourcePath], compilerOptions)

  const sourceFile = program.getSourceFile(sourcePath)
  const emitResult = program.emit(sourceFile, (fileName, data) => {
    mkdirSync(dirname(fileName), { recursive: true })
    writeFileSync(fileName, banner + data)
  })

  const diagnostics = [
    ...ts.getPreEmitDiagnostics(program),
    ...emitResult.diagnostics,
  ]

  const rel = relative(rootDir, sourcePath).replace(/\.ts$/, '')
  const jsPath = join(outDir, `${rel}.js`)

  return { jsPath, diagnostics }
}
