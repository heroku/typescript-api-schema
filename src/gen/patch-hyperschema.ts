// Targeted hyperschema patches for gaps in the upstream Heroku hyperschema.
//
// WHY: The upstream hyperschema's "Refresh ACM" link (PATCH /apps/{id}/acm)
// on the `app` definition ships with NO `schema` block at all — the key is
// absent (not null). Unlike the sibling "Update" link, it declares no request
// body, so the generator emits neither a `requestBody` param on the TS method
// nor a `hasRequestBody: true` flag on the route. But the API actually requires
// `{ acm_refresh: true }`, so the SDK dispatcher silently drops the body.
//
// Eric (Heroku architect) authorized making @heroku/types reflect the reality
// of what the web service accepts, even ahead of an upstream hyperschema fix:
//   "i'd try to make changes to the sdk/heroku types to reflect what the
//    reality is in web services, even if it's 'wrong'."
//
// We inject the missing schema here. The guard only fires when the link exists
// and has NO schema, so this SELF-HEALS to a no-op if upstream ever adds the
// schema block itself.

import type { HerokuSchema, SchemaNode } from './schema-types.js'

const REFRESH_ACM_SCHEMA: SchemaNode = {
  type: ['object'],
  properties: { acm_refresh: { type: ['boolean'] } },
  required: ['acm_refresh'],
}

// Mutates `schema` in place and returns it for chaining.
export function patchHyperschema(schema: HerokuSchema): HerokuSchema {
  const app = schema.definitions?.['app']
  const link = app?.links?.find(
    l => l.title === 'Refresh ACM' && l.method?.toUpperCase() === 'PATCH',
  )
  if (link && !link.schema) {
    link.schema = REFRESH_ACM_SCHEMA
  }
  return schema
}
