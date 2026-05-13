// This file contains all logic for verifying the validity of a generated Typescript types definition file.

import ts from 'typescript'

export interface VerifyError {
  message: string
  file?: string
  line?: number
  column?: number
}

export interface VerifyFile {
  name: string
  content: string
}

const VIRTUAL_ROOT = '/'

export function verifyTypes(input: string | VerifyFile[]): VerifyError[] {
  const files: VerifyFile[] = typeof input === 'string'
    ? [{ name: 'generated.d.ts', content: input }]
    : input

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    noEmit: true,
  }

  // Use absolute virtual paths so relative imports (e.g. `../types`) resolve
  // deterministically inside our in-memory file system rather than against the
  // host's CWD.
  const absoluteName = (n: string) => VIRTUAL_ROOT + n
  const sourceFiles = new Map<string, ts.SourceFile>()
  for (const f of files) {
    sourceFiles.set(absoluteName(f.name), ts.createSourceFile(absoluteName(f.name), f.content, ts.ScriptTarget.ES2020, true))
  }

  const host = ts.createCompilerHost(compilerOptions)
  const originalGetSourceFile = host.getSourceFile.bind(host)
  const originalFileExists = host.fileExists.bind(host)
  const originalReadFile = host.readFile.bind(host)
  const virtualNames = new Set(sourceFiles.keys())

  host.getCurrentDirectory = () => VIRTUAL_ROOT
  host.getSourceFile = (name, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
    const sf = sourceFiles.get(name)
    if (sf) return sf
    return originalGetSourceFile(name, languageVersionOrOptions, onError, shouldCreateNewSourceFile)
  }
  host.fileExists = (name) => virtualNames.has(name) || originalFileExists(name)
  host.readFile = (name) => {
    const sf = sourceFiles.get(name)
    return sf ? sf.text : originalReadFile(name)
  }

  const program = ts.createProgram([...virtualNames], compilerOptions, host)
  const diagnostics = ts.getPreEmitDiagnostics(program)
    .filter(d => d.file && virtualNames.has(d.file.fileName))

  return diagnostics.map(d => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n')
    const file = d.file ? d.file.fileName.slice(VIRTUAL_ROOT.length) : undefined
    if (d.start !== undefined && d.file) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start)
      return { message, file, line: line + 1, column: character + 1 }
    }
    return { message, file }
  })
}
