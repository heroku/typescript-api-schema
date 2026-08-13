import type { RouteDefinition } from '../gen/schema-types.js'

export const account = {
  infoWithToken: {
    method: 'GET',
    path: '/account/github/token',
  },
} as const satisfies Record<string, RouteDefinition>

export const appLink = {
  info: {
    method: 'GET',
    path: '/apps/{app}/github',
  },
  update: {
    method: 'PATCH',
    path: '/apps/{app}/github',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const pipeline = {
  listAppLinks: {
    method: 'GET',
    path: '/pipelines/{pipeline}/github',
  },
} as const satisfies Record<string, RouteDefinition>

export const pipelineRepository = {
  info: {
    method: 'GET',
    path: '/pipelines/{pipeline}/repository',
  },
  create: {
    method: 'POST',
    path: '/pipelines/{pipeline}/repository',
    hasRequestBody: true,
  },
  update: {
    method: 'PATCH',
    path: '/pipelines/{pipeline}/repository',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const githubTarball = {
  info: {
    method: 'GET',
    path: '/github/repos/{owner}/{repo}/tarball/{ref}',
  },
} as const satisfies Record<string, RouteDefinition>