/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export interface FormationMetricErrorsResult {
  data: Record<string, unknown>
  start_time: string
  end_time: string
  step: string
}

export interface RouterMetricLatencyResult {
  data: Record<string, unknown>
  start_time: string
  end_time: string
  step: string
}

export interface RouterMetricErrorsResult {
  data: Record<string, unknown>
  start_time: string
  end_time: string
  step: string
}

export interface RouterMetricStatusResult {
  data: Record<string, unknown>
  start_time: string
  end_time: string
  step: string
}

export interface HerokuClient {
  formationMetric: {
  errors(app: string, formationType: string, query: {
  start_time?: string
  end_time?: string
  step?: string
}): Promise<FormationMetricErrorsResult>
  }
  routerMetric: {
  latency(app: string, query: {
  start_time?: string
  end_time?: string
  step?: string
  process_type?: string
}): Promise<RouterMetricLatencyResult>
  errors(app: string, query: {
  start_time?: string
  end_time?: string
  step?: string
  process_type?: string
}): Promise<RouterMetricErrorsResult>
  status(app: string, query: {
  start_time?: string
  end_time?: string
  step?: string
  process_type?: string
}): Promise<RouterMetricStatusResult>
  }
}
