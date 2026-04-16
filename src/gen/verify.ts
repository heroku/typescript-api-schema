// This file contains all logic for verifying the validity of a generated Typescript types definition file.

import ts from 'typescript'

export interface VerifyError {
  message: string
  line?: number
  column?: number
}

export function verifyTypes(content: string): VerifyError[] {
  const fileName = 'generated.d.ts'

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    strict: true,
    noEmit: true,
  }

  const sourceFile = ts.createSourceFile(
    fileName,
    content,
    ts.ScriptTarget.ES2020,
    true,
  )

  const host = ts.createCompilerHost(compilerOptions)
  const originalGetSourceFile = host.getSourceFile.bind(host)
  const originalFileExists = host.fileExists.bind(host)
  const originalReadFile = host.readFile.bind(host)

  host.getSourceFile = (name, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
    if (name === fileName) return sourceFile
    return originalGetSourceFile(name, languageVersionOrOptions, onError, shouldCreateNewSourceFile)
  }
  host.fileExists = (name) => name === fileName || originalFileExists(name)
  host.readFile = (name) => name === fileName ? content : originalReadFile(name)

  const program = ts.createProgram([fileName], compilerOptions, host)
  const diagnostics = ts.getPreEmitDiagnostics(program)
    .filter(d => d.file?.fileName === fileName)

  return diagnostics.map(d => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n')
    if (d.start !== undefined && d.file) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start)
      return { message, line: line + 1, column: character + 1 }
    }
    return { message }
  })
}
