import type { RouteDefinition } from '../gen/schema-types.js'

export const favorite = {
  list: {
    method: 'GET',
    path: '/favorites',
    query: ['type'],
  },
  create: {
    method: 'POST',
    path: '/favorites',
    hasRequestBody: true,
  },
  delete: {
    method: 'DELETE',
    path: '/favorites/{id}',
  },
} as const satisfies Record<string, RouteDefinition>
