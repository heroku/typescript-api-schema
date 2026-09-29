import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // verifyTypes() spins up a full TypeScript program (ts.createProgram +
    // getPreEmitDiagnostics), which loads the default lib.*.d.ts files and
    // type-checks. Under v8 coverage instrumentation on CI runners that first
    // compiler init can exceed vitest's 5s default, so give tests more headroom.
    testTimeout: 30_000,
  },
})
