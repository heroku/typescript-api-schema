import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { parse } from 'yaml'

import type { OpenApiDocument, OpenApiSchema } from '../gen/openapi-types.js'
import { applyDataSpecPatches } from './spec-patches.js'

const FIXTURE = resolve(dirname(fileURLToPath(import.meta.url)), '../../tests/__fixtures__/data-api-swagger.yaml')

function specWith(schemas: Record<string, OpenApiSchema>): OpenApiDocument {
  return { paths: {}, components: { schemas } }
}

const optsOf = (spec: OpenApiDocument) =>
  (spec.components!.schemas!.PostgresDatabaseUpdateConfigOpts as OpenApiSchema).properties!

describe('applyDataSpecPatches', () => {
  describe('PostgresDatabaseUpdateConfigOpts', () => {
    it('adds every setting from PostgresDatabaseConfigResult, typed as its value, to the pinned spec', () => {
      const spec = parse(readFileSync(FIXTURE, 'utf8')) as OpenApiDocument
      const configKeys = Object.keys((spec.components!.schemas!.PostgresDatabaseConfigResult as OpenApiSchema).properties!)

      const opts = optsOf(applyDataSpecPatches(spec))

      expect(Object.keys(opts).sort()).toEqual([...configKeys].sort())
      expect(opts.log_lock_waits).toEqual({ type: 'boolean' })
      expect(opts.log_statement).toEqual({ type: 'string' })
      expect(opts['auto_explain.log_min_duration']).toEqual({ type: 'integer' })
    })

    it('resolves $ref settings and keeps settings the spec already lists', () => {
      const spec = specWith({
        Bool: { type: 'object', properties: { value: { type: 'boolean' } } },
        PostgresDatabaseConfigResult: {
          type: 'object',
          properties: {
            log_connections: { $ref: '#/components/schemas/Bool' },
            log_lock_waits: { $ref: '#/components/schemas/Bool' },
          },
        },
        PostgresDatabaseUpdateConfigOpts: { type: 'object', properties: { log_connections: { type: 'string' } } },
      })

      expect(optsOf(applyDataSpecPatches(spec))).toEqual({
        log_connections: { type: 'string' },
        log_lock_waits: { type: 'boolean' },
      })
    })

    it('follows chained $ref settings', () => {
      const spec = specWith({
        Bool: { type: 'object', properties: { value: { type: 'boolean' } } },
        LockWaits: { $ref: '#/components/schemas/Bool' },
        PostgresDatabaseConfigResult: {
          type: 'object',
          properties: { log_lock_waits: { $ref: '#/components/schemas/LockWaits' } },
        },
        PostgresDatabaseUpdateConfigOpts: { type: 'object', properties: {} },
      })

      expect(optsOf(applyDataSpecPatches(spec))).toEqual({ log_lock_waits: { type: 'boolean' } })
    })

    it('throws when a setting $ref does not resolve', () => {
      const spec = specWith({
        PostgresDatabaseConfigResult: {
          type: 'object',
          properties: { log_lock_waits: { $ref: '#/components/schemas/Missing' } },
        },
        PostgresDatabaseUpdateConfigOpts: { type: 'object', properties: {} },
      })

      expect(() => applyDataSpecPatches(spec)).toThrow('Could not resolve $ref: #/components/schemas/Missing')
    })

    it('does not modify the input spec', () => {
      const spec = specWith({
        PostgresDatabaseConfigResult: { type: 'object', properties: { a: { type: 'object', properties: { value: { type: 'integer' } } } } },
        PostgresDatabaseUpdateConfigOpts: { type: 'object', properties: {} },
      })

      applyDataSpecPatches(spec)

      expect(optsOf(spec)).toEqual({})
    })

    it('leaves a spec without the schemas unchanged', () => {
      const spec = specWith({ Other: { type: 'string' } })

      expect(applyDataSpecPatches(spec)).toEqual(spec)
      expect(applyDataSpecPatches({ paths: {} })).toEqual({ paths: {} })
    })

    it('throws when a setting has no value type', () => {
      const spec = specWith({
        PostgresDatabaseConfigResult: { type: 'object', properties: { odd: { type: 'string' } } },
        PostgresDatabaseUpdateConfigOpts: { type: 'object', properties: {} },
      })

      expect(() => applyDataSpecPatches(spec)).toThrow("can't find the value type of PostgresDatabaseConfigResult.odd")
    })
  })
})
