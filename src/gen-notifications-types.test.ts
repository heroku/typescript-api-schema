import { describe, expect, it, vi } from 'vitest'
import { notification } from './notifications/routes.js'
import { generateNotificationsTypes, main, type MainDeps } from './gen-notifications-types.js'

const schemas = JSON.parse(
  (await import('node:fs')).readFileSync(new URL('./notifications/schemas.json', import.meta.url), 'utf8'),
)

describe('generateNotificationsTypes', () => {
  it('emits the generated banner', () => {
    expect(generateNotificationsTypes({}, {})).toContain('NOTE: the contents of this file are generated.')
  })
  
  it('emits HerokuClient grouped by resource', () => {
    const out = generateNotificationsTypes({ notification }, schemas)
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toContain('notification: {')
  })
})

describe('main', () => {
  it('emits typed route source and writes types.d.ts and routes.d.ts', async () => {
    const deps: Partial<MainDeps> = {
      writeFile: vi.fn(),
      emitTypedSource: vi.fn().mockReturnValue({
        jsPath: '/fake/dist/notifications/routes.js',
        diagnostics: [],
      }),
      log: vi.fn(),
    }

    await main(deps)

    expect(deps.emitTypedSource).toHaveBeenCalledWith(expect.objectContaining({
      sourcePath: expect.stringContaining('notifications/routes.ts'),
    }))
    expect(deps.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('notifications/types.d.ts'),
      expect.stringContaining('HerokuClient'),
    )
    expect(deps.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('notifications/routes.d.ts'),
      expect.stringContaining('notification'),
    )
  })
})
