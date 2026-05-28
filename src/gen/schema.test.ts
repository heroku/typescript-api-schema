import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchSchema } from './schema.js'

describe('fetchSchema', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches schema with default URL and variant', async () => {
    const mockData = { definitions: {} }
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response)

    const result = await fetchSchema()

    expect(fetch).toHaveBeenCalledWith('https://api.heroku.com/schema', {
      headers: { Accept: 'application/vnd.heroku+json; version=3.sdk' },
    })
    expect(result).toEqual(mockData)
  })

  it('uses custom URL and variant when provided', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response)

    await fetchSchema('https://custom.api/schema', '3.custom')

    expect(fetch).toHaveBeenCalledWith('https://custom.api/schema', {
      headers: { Accept: 'application/vnd.heroku+json; version=3.custom' },
    })
  })

  it('throws on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response)

    await expect(fetchSchema()).rejects.toThrow('Failed to fetch schema: 404 Not Found')
  })
})
