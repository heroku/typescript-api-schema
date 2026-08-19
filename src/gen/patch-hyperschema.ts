// Targeted hyperschema patches for gaps in the upstream Heroku hyperschema.
//
// WHY: The upstream hyperschema's "Refresh ACM" link (PATCH /apps/{id}/acm)
// on the `app` definition ships with NO `schema` block at all — the key is
// absent (not null). Unlike the sibling "Update" link, it declares no request
// body, so the generator emits neither a `requestBody` param on the TS method
// nor a `hasRequestBody: true` flag on the route. But the API actually requires
// `{ acm_refresh: true }`, so the SDK dispatcher silently drops the body.
//
// We patch @heroku/types to reflect what the web service actually accepts,
// rather than blocking on an upstream hyperschema fix.
//
// We inject the missing schema here. The guard only fires when the link exists
// and has NO schema, so this SELF-HEALS to a no-op if upstream ever adds the
// schema block itself.

import type { HerokuSchema, ResourceDefinition, SchemaLink, SchemaNode } from './schema-types.js'

const REFRESH_ACM_SCHEMA: SchemaNode = {
  type: ['object'],
  properties: { acm_refresh: { type: ['boolean'] } },
  required: ['acm_refresh'],
}

// WHY: The upstream hyperschema has no `space-dyno` resource at all, so
// `GET /spaces/{spaceIdentity}/dynos` (used by the CLI's `heroku spaces:ps`)
// has no generated route or type. We inject a minimal resource mirroring the
// existing `space-host` "list of self" shape: each item is `{ app_name,
// dynos }`, where `dynos` reuses the already-generated top-level `Dyno` type
// via a resource-level $ref rather than duplicating its shape.
//
// The guard checks for the resource AND a GET/"instances" link on it, so this
// SELF-HEALS to a no-op if upstream ever adds `space-dyno` (with or without
// the list link) itself.
const SPACE_DYNO_LIST_LINK: SchemaLink = {
  title: 'List',
  description: 'Current running dynos for a space, grouped by app.',
  method: 'GET',
  rel: 'instances',
  href: '/spaces/{(%23%2Fdefinitions%2Fspace%2Fdefinitions%2Fidentity)}/dynos',
  targetSchema: {
    type: ['array'],
    items: { $ref: '#/definitions/space-dyno' },
  },
}

const SPACE_DYNO_DEFINITION: ResourceDefinition = {
  description: 'Dynos running in a space, grouped by app.',
  type: ['object'],
  strictProperties: true,
  definitions: {
    app_name: {
      description: 'unique name of app',
      readOnly: true,
      type: ['string'],
    },
  },
  properties: {
    app_name: { $ref: '#/definitions/space-dyno/definitions/app_name' },
    dynos: {
      description: 'dynos running for this app in the space',
      readOnly: true,
      type: ['array'],
      items: { $ref: '#/definitions/dyno' },
    },
  },
  links: [SPACE_DYNO_LIST_LINK],
}

function hasSpaceDynoListLink(links: SchemaLink[] | undefined): boolean {
  return Boolean(links?.some(l => l.rel === 'instances' && l.method?.toUpperCase() === 'GET'))
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

  const definitions = schema.definitions
  if (definitions) {
    const spaceDyno = definitions['space-dyno']
    if (!spaceDyno) {
      definitions['space-dyno'] = structuredClone(SPACE_DYNO_DEFINITION)
    } else if (!hasSpaceDynoListLink(spaceDyno.links)) {
      spaceDyno.links = [...(spaceDyno.links ?? []), structuredClone(SPACE_DYNO_LIST_LINK)]
    }
  }

  return schema
}
