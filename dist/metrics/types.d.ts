/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export interface FormationMetricErrorsResult {
  data: Record<string, Array<number | null>>
  start_time: string
  end_time: string
  step: number
}

export type FormationMonitorListResult = Array<{
  id: string
  name?: string
  action_type: string
  is_active?: boolean
  op?: string
  period?: number
  notification_period?: number
  notification_channels?: Array<string>
  max_quantity?: number
  min_quantity?: number
  value?: number
}>

export interface FormationMonitorCreateOpts {
  name?: string
  action_type?: string
  is_active?: boolean
  op?: string
  period?: number
  notification_period?: number
  notification_channels?: Array<string>
  max_quantity?: number
  min_quantity?: number
  value?: number
}

export interface FormationMonitorCreateResult {
  id: string
}

export interface FormationMonitorUpdateOpts {
  name?: string
  action_type?: string
  is_active?: boolean
  op?: string
  period?: number
  notification_period?: number
  notification_channels?: Array<string>
  max_quantity?: number
  min_quantity?: number
  value?: number
}

export type FormationMonitorUpdateResult = Record<string, unknown>

export interface RouterMetricLatencyResult {
  data: Record<string, Array<number | null>>
  start_time: string
  end_time: string
  step: number
}

export interface RouterMetricErrorsResult {
  data: Record<string, Array<number | null>>
  start_time: string
  end_time: string
  step: number
}

export interface RouterMetricStatusResult {
  data: Record<string, Array<number | null>>
  start_time: string
  end_time: string
  step: number
}

export interface HerokuClient {
  formationMetric: {
  errors(app: string, formationType: string, query: {
  start_time?: string
  end_time?: string
  step?: string
}): Promise<FormationMetricErrorsResult>
  }
  formationMonitor: {
  list(app: string, formationType: string): Promise<FormationMonitorListResult>
  create(app: string, formationType: string, requestBody: FormationMonitorCreateOpts): Promise<FormationMonitorCreateResult>
  update(app: string, formationType: string, monitorId: string, requestBody: FormationMonitorUpdateOpts): Promise<FormationMonitorUpdateResult>
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
