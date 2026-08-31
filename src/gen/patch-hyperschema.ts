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

const GITHUB_REPOSITORY_PIPELINE_HREF = '/pipelines/{(%23%2Fdefinitions%2Fpipeline%2Fdefinitions%2Fidentity)}/repo'

const GITHUB_REPOSITORY_DEFINITIONS = {
  name: {
    description: 'name of the repository',
    example: 'repository_name',
    readOnly: true,
    type: ['string'],
  },
  full_name: {
    description: 'The full name with owner of a repository',
    example: 'owner/repository_name',
    readOnly: true,
    type: ['string'],
  },
  id: {
    description: 'the GitHub id of the repository',
    example: 123,
    readOnly: true,
    type: ['integer'],
  },
} satisfies Record<string, SchemaNode>

const GITHUB_REPOSITORY_PROPERTIES = {
  name: {$ref: '#/definitions/github-repository/definitions/name'},
  full_name: {$ref: '#/definitions/github-repository/definitions/full_name'},
  id: {$ref: '#/definitions/github-repository/definitions/id'},
} satisfies Record<string, SchemaNode>

const GITHUB_REPOSITORY_PIPELINE_LINK: SchemaLink = {
  description: 'Get Repository Information for a pipeline',
  href: GITHUB_REPOSITORY_PIPELINE_HREF,
  method: 'GET',
  rel: 'self',
  title: 'Get repository information for a pipeline',
  targetSchema: {$ref: '#/definitions/github-repository'},
}

const GITHUB_REPOSITORY_DEFINITION: ResourceDefinition = {
  description: 'Repositories selected by an installation',
  strictProperties: false,
  type: ['object'],
  definitions: GITHUB_REPOSITORY_DEFINITIONS,
  properties: GITHUB_REPOSITORY_PROPERTIES,
  links: [GITHUB_REPOSITORY_PIPELINE_LINK],
}

function hasSpaceDynoListLink(links: SchemaLink[] | undefined): boolean {
  return Boolean(links?.some(l => l.rel === 'instances' && l.method?.toUpperCase() === 'GET'))
}

function hasGithubRepositoryPipelineLink(links: SchemaLink[] | undefined): boolean {
  return Boolean(links?.some(
    link => link.method?.toUpperCase() === 'GET' && link.href === GITHUB_REPOSITORY_PIPELINE_HREF,
  ))
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

    const githubRepository = definitions['github-repository']
    if (!githubRepository) {
      definitions['github-repository'] = structuredClone(GITHUB_REPOSITORY_DEFINITION)
    } else {
      githubRepository.definitions ??= {}
      githubRepository.definitions.name ??= structuredClone(GITHUB_REPOSITORY_DEFINITIONS.name)
      githubRepository.definitions.full_name ??= structuredClone(GITHUB_REPOSITORY_DEFINITIONS.full_name)
      githubRepository.definitions.id ??= structuredClone(GITHUB_REPOSITORY_DEFINITIONS.id)

      githubRepository.properties ??= {}
      githubRepository.properties.name ??= structuredClone(GITHUB_REPOSITORY_PROPERTIES.name)
      githubRepository.properties.full_name ??= structuredClone(GITHUB_REPOSITORY_PROPERTIES.full_name)
      githubRepository.properties.id ??= structuredClone(GITHUB_REPOSITORY_PROPERTIES.id)

      if (!hasGithubRepositoryPipelineLink(githubRepository.links)) {
        githubRepository.links = [
          ...(githubRepository.links ?? []),
          structuredClone(GITHUB_REPOSITORY_PIPELINE_LINK),
        ]
      }
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
  }

  return schema
}
