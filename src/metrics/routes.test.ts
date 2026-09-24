import { describe, it, expect } from 'vitest'
import { routerMetric, formationMetric, formationMonitor } from './routes.js'

describe('metrics routes', () => {
  it('declares the three router-metric GET routes with query params', () => {
    expect(routerMetric.latency).toEqual({
      method: 'GET',
      path: '/apps/{app}/router-metrics/latency',
      query: ['start_time', 'end_time', 'step', 'process_type'],
    })
    expect(routerMetric.errors.path).toBe('/apps/{app}/router-metrics/errors')
    expect(routerMetric.status.path).toBe('/apps/{app}/router-metrics/status')
    for (const r of Object.values(routerMetric)) {
      expect(r.method).toBe('GET')
      expect(r.query).toContain('process_type')
    }
  })

  it('declares the formation-metric errors route (no process_type query)', () => {
    expect(formationMetric.errors).toEqual({
      method: 'GET',
      path: '/apps/{app}/formation/{formationType}/metrics/errors',
      query: ['start_time', 'end_time', 'step'],
    })
  })

  it('declares the formation-monitor list/create/update routes with request-body flags', () => {
    expect(formationMonitor.list).toEqual({
      method: 'GET',
      path: '/apps/{app}/formation/{formationType}/monitors',
    })
    expect(formationMonitor.create).toEqual({
      method: 'POST',
      path: '/apps/{app}/formation/{formationType}/monitors',
      hasRequestBody: true,
    })
    expect(formationMonitor.update).toEqual({
      method: 'PATCH',
      path: '/apps/{app}/formation/{formationType}/monitors/{monitorId}',
      hasRequestBody: true,
    })
  })
})
