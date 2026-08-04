import { describe, it, expect, vi } from 'vitest'
import { generateMetricsTypes, main, type MainDeps } from './gen-metrics-types.js'
import { routerMetric, formationMetric } from './metrics/routes.js'

const schemas = JSON.parse(
  (await import('node:fs')).readFileSync(new URL('./metrics/schemas.json', import.meta.url), 'utf8'),
)

describe('generateMetricsTypes', () => {
  it('emits HerokuClient with routerMetric + formationMetric and query params', () => {
    const out = generateMetricsTypes({ routerMetric, formationMetric }, schemas)
    expect(out).toContain('export interface HerokuClient {')
    expect(out).toContain('routerMetric: {')
    expect(out).toContain('formationMetric: {')
    // router latency: app path param + query object
    expect(out).toMatch(/latency\(app: string, query: \{[\s\S]*?process_type\?: string[\s\S]*?\}\): Promise</)
    // formation errors: app + formationType path params + query object (no process_type)
    expect(out).toMatch(/errors\(app: string, formationType: string, query: \{[\s\S]*?step\?: string[\s\S]*?\}\): Promise</)
    // response Result carries the metrics fields
    expect(out).toMatch(/start_time\??: string/)
  })
})

describe('main (metrics driver)', () => {
  it('writes routes.js, routes.d.ts, and types.d.ts', async () => {
    const writes: Record<string, string> = {}
    const deps: Partial<MainDeps> = {
      writeFile: (p, c) => { writes[p] = c },
      emitTypedSource: () => ({ jsPath: '/fake/dist/metrics/routes.js', diagnostics: [] }),
      log: () => {},
    }
    await main(deps)
    const keys = Object.keys(writes)
    expect(keys.some(k => k.endsWith('metrics/types.d.ts'))).toBe(true)
    expect(keys.some(k => k.endsWith('metrics/routes.d.ts'))).toBe(true)
    expect(writes[keys.find(k => k.endsWith('metrics/routes.d.ts'))!]).toContain('routerMetric')
    // Verify the shared dist/types.d.ts is rewritten with query field (NOT under metrics/)
    const sharedKey = keys.find(k => k.endsWith('types.d.ts') && !k.includes('metrics'))
    expect(sharedKey).toBeTruthy()
    expect(writes[sharedKey!]).toContain('query?: string[]')
  })
})
