import { normalizeHyperschema } from './normalize-hyperschema.js'
import { emitTypes } from './ts-emit.js'
import type { HerokuSchema } from './schema-types.js'

export const GENERATED_CONTENT_PREAMBLE = `
/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

`.trimStart()

export function generateTypes(schema: HerokuSchema): string {
  return emitTypes(normalizeHyperschema(schema))
}
