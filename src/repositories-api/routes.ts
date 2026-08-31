import type { RouteDefinition } from '../gen/schema-types.js'

export const githubRepository = {
  getRepositoryInformationForAPipeline: {
    method: 'GET',
    path: '/pipelines/{pipelineIdentity}/repo',
  },
} as const satisfies Record<string, RouteDefinition>
