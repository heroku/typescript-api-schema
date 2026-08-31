import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

import {describe, expect, it} from 'vitest'

describe('published repositories-api exports', () => {
  it('maps the focused client and route registry to generated artifacts', () => {
    const packageJson = JSON.parse(readFileSync(resolve(import.meta.dirname, '../../package.json'), 'utf8'))

    expect(packageJson.exports['./repositories-api']).toEqual({
      types: './dist/repositories-api/types.d.ts',
    })
    expect(packageJson.exports['./repositories-api/routes']).toEqual({
      types: './dist/repositories-api/routes.d.ts',
      default: './dist/repositories-api/routes.js',
    })
  })
})
