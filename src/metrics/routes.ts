// Hand-authored route registry for api.metrics.heroku.com. NOT code-generated
// (the metrics service has no hyperschema). Paths and query params verified
// 2026-08-04 against github.com/heroku/metaas — the Go service behind the API:
//   - routes: cmd/metrics-api/main.go
//   - query params: v2/serializers/request.go (start_time, end_time, step,
//     process_type; also `region`, intentionally omitted here as no CLI
//     consumer uses it). `process_type` is read but ignored for router-metrics
//     and meaningful only for formation metrics.
// If metaas changes these, update this file by hand.
import type { RouteDefinition } from '../gen/schema-types.js'

export const routerMetric = {
  latency: {
    method: 'GET',
    path: '/apps/{app}/router-metrics/latency',
    query: ['start_time', 'end_time', 'step', 'process_type'],
  },
  errors: {
    method: 'GET',
    path: '/apps/{app}/router-metrics/errors',
    query: ['start_time', 'end_time', 'step', 'process_type'],
  },
  status: {
    method: 'GET',
    path: '/apps/{app}/router-metrics/status',
    query: ['start_time', 'end_time', 'step', 'process_type'],
  },
} as const satisfies Record<string, RouteDefinition>

export const formationMetric = {
  errors: {
    method: 'GET',
    path: '/apps/{app}/formation/{formationType}/metrics/errors',
    query: ['start_time', 'end_time', 'step'],
  },
} as const satisfies Record<string, RouteDefinition>
