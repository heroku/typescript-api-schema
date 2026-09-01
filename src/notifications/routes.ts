import type { RouteDefinition } from '../gen/schema-types.js'

export const notification = {
  list: {
    method: 'GET',
    path: '/user/notifications',
  },
  update: {
    method: 'PATCH',
    path: '/user/notifications/{id}',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>
