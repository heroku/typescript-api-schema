import { describe, expect, it } from 'vitest'
import * as routes from './routes.js'

describe('dashboard-backend routes', () => {
  it('declares only the favorite list, create, and delete routes', () => {
    expect(Object.keys(routes)).toEqual(['favorite'])
    expect(Object.keys(routes.favorite)).toEqual(['list', 'create', 'delete'])
    expect(routes.favorite).toEqual({
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
    })
  })
})
