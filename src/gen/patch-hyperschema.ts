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

    // WHY: The upstream hyperschema's space "Create" link doesn't declare a
    // `kpi_url` property on its request schema, even though the API accepts
    // (and `spaces:create` forwards) a hidden `--kpi-url` flag for a
    // self-managed KPI endpoint. Without this, the generated
    // `SpaceCreateOpts` type lacks the field and the CLI has to `as`-cast
    // around it.
    //
    // We inject the property here as optional (never added to `required`).
    // The guard only fires when the Create link exists and has a `schema`,
    // so this SELF-HEALS to a no-op if upstream ever adds the property
    // itself.
    const space = definitions['space']
    const createLink = space?.links?.find(
      l => l.title === 'Create' && l.method?.toUpperCase() === 'POST',
    )
    if (createLink?.schema) {
      createLink.schema.properties ??= {}
      createLink.schema.properties.kpi_url ??= { type: ['string'] }
    }

    // WHY: The upstream hyperschema's `space-topology` apps-item property is
    // named `formation` (singular), but the topology response is a straight
    // control-plane passthrough (not an API serializer), and the live
    // payload key has always been `formations` (plural) — the CLI reads
    // `app.formations`. We rename the property KEY here; the `$ref`
    // definition target keeps its `formation` name.
    //
    // The guard only fires when `formation` is present and `formations` is
    // absent, so this SELF-HEALS to a no-op if upstream ever renames the
    // property itself (or if the property is absent entirely).
    const spaceTopology = definitions['space-topology']
    const topologyAppProps = spaceTopology?.properties?.['apps']?.items?.properties
    if (topologyAppProps?.formation && !topologyAppProps.formations) {
      topologyAppProps.formations = topologyAppProps.formation
      delete topologyAppProps.formation
    }

    // WHY: The upstream hyperschema gives all three `usage` GET links the same
    // title ("Info"), so the generator's title disambiguation collapses them to
    // a single `infoGet` route key (last-write-wins keeps only
    // `GET /teams/{team}/usage`). The two app-scoped overloads
    // (`infoGet(appIdentity)` and `infoGet(teamIdentity, teamAppIdentity)`)
    // still type-check but MIS-DISPATCH at runtime to `/teams/{that-arg}/usage`,
    // so app and team-app usage are unreachable through the generated client.
    //
    // We give each link a distinct title so the registry emits three real keys:
    // `forApp` (GET /apps/:app/usage), `forTeamApp`
    // (GET /teams/:team/apps/:app/usage), and `infoGet` (unchanged — the team
    // route GET /teams/:team/usage, whose result type stays UsageInfoGetResult).
    // Links are matched by `href` so we don't depend on the colliding title text.
    //
    // The guard only renames a link whose title differs from its target, so this
    // SELF-HEALS to a no-op if upstream ever gives these links distinct titles.
    const usage = definitions['usage']
    if (usage?.links) {
      for (const link of usage.links) {
        if (link.method?.toUpperCase() !== 'GET' || !link.href?.endsWith('/usage')) continue
        const hasTeam = link.href.includes('/teams/')
        const hasApp = link.href.includes('/apps/')
        const target = hasTeam && hasApp ? 'For Team App' : hasTeam ? 'Info Get' : 'For App'
        if (link.title !== target) {
          link.title = target
        }
      }
    }

    // WHY: `stack` has two GET links both titled "List" — GET /stacks (every
    // stack) and GET /apps/{app}/available-stacks (stacks available to an app).
    // Identical title+method defeats the title disambiguation (it can only
    // append the method, which is also identical), so both collapse to a single
    // `listGet` route key. Last-write-wins keeps only the app-scoped route, so
    // the global stack list is unreachable through the generated client, and the
    // no-arg `listGet()` overload that still type-checks mis-dispatches at
    // runtime to /apps/{app}/available-stacks (missing path param -> throws).
    //
    // We retitle the app-scoped link so the registry emits two real keys: `list`
    // (GET /stacks, matching every other resource's collection list) and
    // `listAvailable` (GET /apps/{app}/available-stacks). Matched by href so we
    // don't depend on the colliding title text; self-heals if upstream gives the
    // links distinct titles.
    const stack = definitions['stack']
    const stackAvailable = stack?.links?.find(
      l => l.method?.toUpperCase() === 'GET' && l.href?.endsWith('/available-stacks'),
    )
    if (stackAvailable && stackAvailable.title !== 'List Available') {
      stackAvailable.title = 'List Available'
    }

    // WHY: `generation` has the same two-"List"-GET-links collision as `stack`
    // — GET /generations (all generations) and
    // GET /teams/{team}/available-generations (generations available to a team)
    // — collapsing to one `listGet` key and silently dropping the global list.
    // Retitle the team-scoped link so the registry emits `list`
    // (GET /generations) and `listAvailable`
    // (GET /teams/{team}/available-generations). Self-heals as above.
    const generation = definitions['generation']
    const generationAvailable = generation?.links?.find(
      l => l.method?.toUpperCase() === 'GET' && l.href?.endsWith('/available-generations'),
    )
    if (generationAvailable && generationAvailable.title !== 'List Available') {
      generationAvailable.title = 'List Available'
    }

    // WHY: `payment` has two POST links both titled "Create" — POST
    // /account/payments (the authenticated account's own payment) and POST
    // /teams/{team}/payments (a team's payment). Identical title+method collapse
    // to one `create` key; last-write-wins drops the account route. Retitle the
    // team-scoped link so the registry emits `create` (POST /account/payments)
    // and `createForTeam` (POST /teams/{team}/payments). Self-heals as above.
    const payment = definitions['payment']
    const teamPaymentCreate = payment?.links?.find(
      l => l.method?.toUpperCase() === 'POST' && l.href?.includes('/teams/'),
    )
    if (teamPaymentCreate && teamPaymentCreate.title !== 'Create For Team') {
      teamPaymentCreate.title = 'Create For Team'
    }
  }

  return schema
}
