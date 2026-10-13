// Targeted patches for gaps in the upstream Heroku hyperschema.
//
// "Refresh ACM" (PATCH /apps/{id}/acm) on `app` ships no `schema` block, so the
// generator emits no requestBody param or flag — but the API requires
// `{ acm_refresh: true }`. Inject it. Self-heals if upstream adds the schema.

import type { HerokuSchema, ResourceDefinition, SchemaLink, SchemaNode } from './schema-types.js'

const REFRESH_ACM_SCHEMA: SchemaNode = {
  type: ['object'],
  properties: { acm_refresh: { type: ['boolean'] } },
  required: ['acm_refresh'],
}

// Upstream has no `space-dyno` resource, so GET /spaces/{id}/dynos (heroku
// spaces:ps) has no route or type. Inject a minimal resource mirroring
// `space-host`: each item is { app_name, dynos }, with `dynos` reusing the
// generated `Dyno` type via $ref. Self-heals if upstream adds `space-dyno`.
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

    // The space "Create" link omits `kpi_url`, though the API accepts it (and
    // spaces:create forwards a hidden --kpi-url flag). Inject it as optional so
    // SpaceCreateOpts carries it without an `as`-cast. Self-heals if upstream adds it.
    const space = definitions['space']
    const createLink = space?.links?.find(
      l => l.title === 'Create' && l.method?.toUpperCase() === 'POST',
    )
    if (createLink?.schema) {
      createLink.schema.properties ??= {}
      createLink.schema.properties.kpi_url ??= { type: ['string'] }
    }

    // `space-topology`'s apps-item property is `formation` (singular), but the
    // response is a control-plane passthrough whose live key is `formations`
    // (plural) — the CLI reads `app.formations`. Rename the property key only
    // (the $ref target keeps `formation`). Self-heals if upstream renames it.
    const spaceTopology = definitions['space-topology']
    const topologyAppProps = spaceTopology?.properties?.['apps']?.items?.properties
    if (topologyAppProps?.formation && !topologyAppProps.formations) {
      topologyAppProps.formations = topologyAppProps.formation
      delete topologyAppProps.formation
    }

    // All three `usage` GET links share the title "Info", so title disambiguation
    // collapses them to one `infoGet` key (last-write-wins keeps GET
    // /teams/{team}/usage); the app and team-app overloads type-check but
    // mis-dispatch at runtime. Retitle by href so the registry emits three keys:
    // `forApp`, `forTeamApp`, and `infoGet` (the unchanged team route). Matched by
    // href, not the colliding title; self-heals if upstream gives distinct titles.
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

    // `stack` has two GET links both titled "List" — GET /stacks (all stacks) and
    // GET /apps/{app}/available-stacks. Identical title+method defeats title
    // disambiguation, so both collapse to one `listGet` key; last-write-wins drops
    // the global list and the no-arg `listGet()` overload mis-dispatches at runtime
    // (missing path param -> throws). Retitle the app-scoped link so the registry
    // emits `list` and `listAvailable`. Matched by href; self-heals as above.
    const stack = definitions['stack']
    const stackAvailable = stack?.links?.find(
      l => l.method?.toUpperCase() === 'GET' && l.href?.endsWith('/available-stacks'),
    )
    if (stackAvailable && stackAvailable.title !== 'List Available') {
      stackAvailable.title = 'List Available'
    }

    // Same two-"List"-GET collision as `stack`: GET /generations and
    // GET /teams/{team}/available-generations collapse to one `listGet` key.
    // Retitle the team-scoped link so the registry emits `list` and `listAvailable`.
    const generation = definitions['generation']
    const generationAvailable = generation?.links?.find(
      l => l.method?.toUpperCase() === 'GET' && l.href?.endsWith('/available-generations'),
    )
    if (generationAvailable && generationAvailable.title !== 'List Available') {
      generationAvailable.title = 'List Available'
    }

    // Same collision for `payment`: POST /account/payments and
    // POST /teams/{team}/payments both titled "Create" collapse to one `create`
    // key. Retitle the team-scoped link so the registry emits `create` and
    // `createForTeam`.
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
