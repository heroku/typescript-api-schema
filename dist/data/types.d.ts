/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export interface BackupCreateResult {
  uuid: string
  from_type: string
  to_type: string
}
export interface BurstStatusInfoResult {
  addon_name: string
  addon_id: string
  at: string
  burst_status: {
    volumebalance: {
      latest_value: number
      slope: number
    }
  }
}
export interface ConnectionPoolingInfoResult {
  status: string
  message: string
}
export interface ConnectionPoolingCreateOpts {
  name?: string
  credential?: string
  app?: string
}
export interface ConnectionPoolingCreateResult {
  name?: string
}
export interface DatabaseInfoResult {
  addon_id?: string
  name?: string
  heroku_resource_id?: string
  created_at?: string
  formation?: {
    id: string
    primary: string
  }
  metaas_source?: string
  metaas_server_source?: string
  plan?: string
  port?: number
  database_name?: string | null
  database_user?: string | null
  target_transaction?: unknown | null
  available_for_ingress?: boolean
  resource_url?: string | null
  database_password?: string
  "waiting?"?: boolean
  credentials?: number
  leader?: unknown | null
  info?: Array<{
    name: string
    values: Array<number | string>
    resolve_db_name?: boolean
  }>
  valid?: string
  num_bytes?: number
}
export interface DatabaseConnectionResetResult {
  message: string
}
export interface DatabaseResetResult {
  message: string
}
export interface DatabaseUnfollowResult {
  message: string
}
export interface DatabaseCancelUpgradeResult {
  message: string
}
export interface DatabaseDryRunUpgradeResult {
  message: string
}
export interface DatabasePrepareUpgradeResult {
  message: string
}
export interface DatabaseRunUpgradeResult {
  message: string
}
export interface DatabaseWaitStatusResult {
  message: string
  "waiting?": boolean
}
export interface LinkListResult {
  [key: string]: unknown
}
export interface LinkCreateOpts {
  target: string
  as?: string
}
export interface LinkCreateResult {
  id: string
  created_at: string
  name: string
  remote_name: string
  remote: {
    name: string
    attachment_name: string
  }
}
export interface LinkDeleteResult {
  id: string
  created_at: string
  name: string
  remote_name: string
  remote: {
    name: string
    attachment_name: string
  }
}
export interface LinkInfoResult {
  id: string
  created_at: string
  name: string
  remote_name: string
  remote: {
    name: string
    attachment_name: string
  }
}
export interface MaintenanceInfoResult {
  addon: {
    uuid: string
    name: string
    attachments: Array<string>
    kind: string
    plan: string
    window: string
  }
  app: {
    name: string
    uuid: string
  }
  window: string
  status: string
  required_by: string
  scheduled_for: string
  method: string
  addon_description: string
  started_at: unknown | null
  completed_at: unknown | null
  duration_seconds: unknown | null
  reason: string
  server_created_at: string
}
export interface MaintenanceInfoByAppResult {
  maintenances: Array<{
    addon: {
      uuid: string
      name: string
      attachments: Array<string>
      kind: string
      plan: string
      window: string | null
    }
    app: {
      name: string
      uuid: string
    }
    window: unknown | null
    status: string
    required_by: unknown | null
    scheduled_for: unknown | null
    method: string | null
    addon_description: string | null
    started_at: unknown | null
    completed_at: unknown | null
    duration_seconds: unknown | null
    reason: unknown | null
    server_created_at: unknown | null
  }>
}
export interface MaintenanceHistoryResult {
  maintenances: Array<{
    addon: {
      uuid: string
      name: string
      attachments: Array<string>
      kind: string
      plan: string
      window: string
    }
    app: {
      name: string
      uuid: string
    }
    window: string
    status: string
    required_by: string | null
    scheduled_for: string | null
    method: string | null
    addon_description: string
    started_at: string | null
    completed_at: string | null
    duration_seconds: number | null
    reason: string
    server_created_at: string | null
  }>
}
export interface MaintenanceRunResult {
  message: string
}
export interface MaintenanceScheduleOpts {
  delay_weeks: string
}
export interface MaintenanceScheduleResult {
  addon: {
    uuid: string
    name: string
    attachments: Array<string>
    kind: string
    plan: string
    window: string
  }
  app: {
    name: string
    uuid: string
  }
  window: string
  status: string
  required_by: string
  scheduled_for: string
  method: string
  addon_description: string
  started_at: unknown | null
  completed_at: unknown | null
  duration_seconds: unknown | null
  reason: string
  server_created_at: string
  previously_scheduled_for: string
  customer_requested: boolean
}
export interface MaintenanceWindowResult {
  window: string
  previous_window: unknown | null
  scheduled_for: string | null
  previously_scheduled_for: unknown | null
}
export interface MaintenanceUpdateWindowOpts {
  time_of_day: string
  day_of_week: string
}
export interface MaintenanceUpdateWindowResult {
  window: string
  previous_window: string
  scheduled_for: unknown | null
  previously_scheduled_for: unknown | null
}
export interface MetricsInfoResult {
  [key: string]: unknown
}
export interface PostgresInfoResult {
  app: {
    id: string
    name: string
  }
  addon: {
    id: string
    name: string
  }
  version: string
  region: string
  tier: string
  status: string
  wait_status: {
    waiting: boolean
    message: unknown | null
  }
  created_at: string
  forked_from: unknown | null
  features: {
    continuous_protection: {
      enabled: boolean
    }
    credentials: {
      enabled: boolean
      current_count: number
    }
    data_encryption: {
      enabled: boolean
    }
    fork: {
      enabled: boolean
    }
    highly_available: {
      enabled: boolean
    }
    rollback: {
      enabled: boolean
      earliest_time: unknown | null
      latest_time: unknown | null
    }
  }
  quotas: Array<{
    type: string
    current_gb: unknown | null
    warning_gb: unknown | null
    critical_gb: unknown | null
    enforcement_active: boolean
    enforcement_action: string
  }>
  plan_limits: Array<{
    name: string
    current: number | null
    limit: number
  }>
  pools: Array<{
    id: string
    name: string
    expected_level: string
    expected_count: number
    expected_connection_limit: number
    connections_used: number
    status: string
    endpoints: Array<{
      host: string
      port: number
      status: string
    }>
    compute_instances: Array<unknown>
  }>
  metrics_sources: {
    cluster: string
    database: unknown | null
    leader: unknown | null
  }
}
export interface PostgresWaitStatusResult {
  waiting: boolean
  message: unknown | null
}
export interface PostgresRotateCredentialsResult {
  [key: string]: unknown
}
export interface PostgresRunUpgradeOpts {
  version?: string
}
export interface PostgresRunUpgradeResult {
  message: string
}
export interface PostgresCredentialListResult {
  items: Array<{
    id: string
    name: string
    created_at: string
    type: string
    state: string
    database: string
    host: string
    port: number
    roles: Array<{
      user: string
      password: string
      state: string
    }>
  }>
}
export interface PostgresCredentialCreateOpts {
  name?: string
}
export interface PostgresCredentialCreateResult {
  id: string
  name: string
  created_at: string
  type: string
  state: string
  database: string
  host: string
  port: number
  roles: Array<{
    user: string
    password: string
    state: string
  }>
}
export interface PostgresCredentialInfoResult {
  id: string
  name: string
  created_at: string
  type: string
  state: string
  database: string
  host: string
  port: number
  roles: Array<{
    user: string
    password: string
    state: string
  }>
}
export interface PostgresCredentialRotateResult {
  [key: string]: unknown
}
export interface PostgresDatabaseConfigResult {
  log_lock_waits?: {
    value: boolean
    desc: string
    default: boolean
  }
  log_connections?: {
    value: boolean
    desc: string
    default: boolean
  }
  log_min_duration_statement?: {
    value: number
    desc: string
    default: number
  }
  log_statement?: {
    value: string
    desc: string
    default: string
    values: {
      none: string
      ddl: string
      mod: string
      all: string
    }
  }
  track_functions?: {
    value: string
    desc: string
    default: string
    values: {
      none: string
      pl: string
      all: string
    }
  }
  log_min_error_statement?: {
    value: string
    desc: string
    default: string
    values: {
      error: string
      log: string
      fatal: string
      panic: string
    }
  }
  pgbouncer_max_client_conn?: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_max_db_connections?: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_default_pool_size?: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_server_idle_timeout?: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_min_pool_size?: {
    value: number
    desc: string
    default: number
  }
  data_connector_details_logs?: {
    value: boolean
    desc: string
    default: boolean
  }
  auto_explain?: {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_format"?: {
    value: string
    desc: string
    default: string
    values: {
      text: string
      xml: string
      json: string
      yaml: string
    }
  }
  "auto_explain.log_min_duration"?: {
    value: number
    desc: string
    default: number
  }
  "auto_explain.log_analyze"?: {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_triggers"?: {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_buffers"?: {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_verbose"?: {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_nested_statements"?: {
    value: boolean
    desc: string
    default: boolean
  }
}
export interface PostgresDatabaseUpdateConfigOpts {
  track_functions?: string
  log_min_duration_statement?: number
  log_connections?: boolean
}
export interface PostgresDatabaseUpdateConfigResult {
  log_lock_waits: {
    value: boolean
    desc: string
    default: boolean
  }
  log_connections: {
    value: boolean
    desc: string
    default: boolean
  }
  log_min_duration_statement: {
    value: number
    desc: string
    default: number
  }
  log_statement: {
    value: string
    desc: string
    default: string
    values: {
      none: string
      ddl: string
      mod: string
      all: string
    }
  }
  track_functions: {
    value: string
    desc: string
    default: string
    values: {
      none: string
      pl: string
      all: string
    }
  }
  log_min_error_statement: {
    value: string
    desc: string
    default: string
    values: {
      error: string
      log: string
      fatal: string
      panic: string
    }
  }
  pgbouncer_max_client_conn: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_max_db_connections: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_default_pool_size: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_server_idle_timeout: {
    value: number
    desc: string
    default: number
  }
  pgbouncer_min_pool_size: {
    value: number
    desc: string
    default: number
  }
  data_connector_details_logs: {
    value: boolean
    desc: string
    default: boolean
  }
  auto_explain: {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_format": {
    value: string
    desc: string
    default: string
    values: {
      text: string
      xml: string
      json: string
      yaml: string
    }
  }
  "auto_explain.log_min_duration": {
    value: number
    desc: string
    default: number
  }
  "auto_explain.log_analyze": {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_triggers": {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_buffers": {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_verbose": {
    value: boolean
    desc: string
    default: boolean
  }
  "auto_explain.log_nested_statements": {
    value: boolean
    desc: string
    default: boolean
  }
}
export interface PostgresDatabaseListCredentialsResult {
  [key: string]: unknown
}
export interface PostgresDatabaseCreateCredentialsOpts {
  name: string
}
export interface PostgresDatabaseCreateCredentialsResult {
  message: string
}
export interface PostgresDatabaseRotateCredentialsResult {
  message: string
}
export interface PostgresDatabaseDeleteCredentialResult {
  message: string
}
export interface PostgresDatabaseInfoCredentialResult {
  uuid: string
  name: string
  state: string
  database: string
  host: string
  port: number
  credentials: Array<{
    user: string
    password: string
    state: string
  }>
}
export interface PostgresDatabaseRotateCredentialResult {
  message: string
}
export interface PostgresLevelInfoResult {
  items: Array<{
    name: string
    vcpu: number
    memory_in_gb: number
    connection_limit: number
  }>
}
export interface PostgresPoolCreateOpts {
  name: string
  level?: string
  count?: number
}
export interface PostgresPoolCreateResult {
  id: string
  name: string
  expected_level: string
  expected_count: number
  expected_connection_limit: number
  connections_used: number
  status: string
  endpoints: Array<unknown>
  compute_instances: Array<unknown>
}
export interface PostgresPoolDeleteResult {
  id: string
  message: string
}
export interface PostgresPoolInfoResult {
  id: string
  name: string
  expected_level: string
  expected_count: number
  expected_connection_limit: number
  connections_used: number
  status: string
  endpoints: Array<{
    host: string
    port: number
    status: string
  }>
  compute_instances: Array<unknown>
}
export interface PostgresPoolUpdateOpts {
  count: number
  name?: string
  level?: string
}
export interface PostgresPoolUpdateResult {
  id: string
  name: string
  expected_level: string
  expected_count: number
  expected_connection_limit: number
  connections_used: number
  status: string
  endpoints: Array<{
    host: string
    port: number
    status: string
  }>
  compute_instances: Array<unknown>
}
export interface PostgresQuotaListResult {
  items: Array<{
    type: string
    current_gb: number | null
    warning_gb: number | null
    critical_gb: number | null
    enforcement_active: boolean
    enforcement_action: string
  }>
}
export interface PostgresQuotaInfoResult {
  type: string
  current_gb: unknown | null
  warning_gb: number
  critical_gb: number
  enforcement_active: boolean
  enforcement_action: string
}
export interface PostgresQuotaUpdateOpts {
  enforcement_action?: string
  warning_gb?: number | string | null
  critical_gb?: number | null
}
export interface PostgresQuotaUpdateResult {
  type: string
  current_gb: unknown | null
  warning_gb: number | null
  critical_gb: number | null
  enforcement_active: boolean
  enforcement_action: string
}
export interface PostgresSettingsInfoResult {
  items: Array<{
    name: string
    current: boolean | number
    default: boolean | number
    reboot_required: boolean
    description: unknown | null
    override: unknown | null
  }>
}
export interface PostgresSettingsUpdateOpts {
  settings: string
}
export interface PostgresSettingsUpdateResult {
  changes: Array<{
    name: string
    previous: boolean | number
    current: boolean | number
  }>
}
export interface RedisInfoResult {
  addon_id: string
  name: string
  plan: string
  created_at: string
  formation: {
    id: string
    primary: string
  }
  metaas_source: string
  port: number
  resource_url: string
  info: Array<{
    name: string
    values: Array<number | string>
  }>
  version: string
  prefer_native_tls: boolean
}
export interface RedisConfigResult {
  maxmemory_policy: {
    value: string
    desc: string
    default: string
    values: {
      noeviction: string
      "allkeys-lru": string
      "volatile-lru": string
      "allkeys-random": string
      "volatile-random": string
      "volatile-ttl": string
      "allkeys-lfu": string
      "volatile-lfu": string
    }
  }
  notify_keyspace_events: {
    value: string
    desc: string
    default: string
  }
  timeout: {
    value: number
    desc: string
    default: number
  }
  standby_segv_workaround: {
    value: boolean
    desc: string
    default: boolean
  }
}
export interface RedisUpdateConfigOpts {
  timeout: number
  maxmemory_policy: string
}
export interface RedisUpdateConfigResult {
  maxmemory_policy: {
    value: string
    desc: string
    default: string
    values: {
      noeviction: string
      "allkeys-lru": string
      "volatile-lru": string
      "allkeys-random": string
      "volatile-random": string
      "volatile-ttl": string
      "allkeys-lfu": string
      "volatile-lfu": string
    }
  }
  notify_keyspace_events: {
    value: string
    desc: string
    default: string
  }
  timeout: {
    value: number
    desc: string
    default: number
  }
  standby_segv_workaround: {
    value: boolean
    desc: string
    default: boolean
  }
}
export interface RedisRotateCredentialsResult {
  message: string
}
export interface RedisResetStatsResult {
  message: string
}
export interface RedisUpgradeOpts {
  version?: string
}
export interface RedisUpgradeResult {
  message: string
}
export interface RedisWaitResult {
  message: string
  "waiting?": boolean
}
export interface RestoreCreateResult {
  uuid: string
  from_type: string
  to_type: string
}
export interface TransferListByAppResult {
  [key: string]: unknown
}
export interface TransferInfoByAppResult {
  uuid: string
  num: string
  from_type: string
  to_type: string
  from_name?: string
  from_uuid?: string
  from_url?: string
  to_name?: string
  to_uuid?: string
  to_url?: string
  options?: Record<string, unknown>
  source_bytes?: number
  processed_bytes?: number
  succeeded?: unknown | null
  warnings?: number
  created_at?: string
  started_at?: unknown | null
  canceled_at?: unknown | null
  updated_at?: string
  finished_at?: unknown | null
  deleted_at?: unknown | null
  purged_at?: unknown | null
  num_keep?: number
  logs?: Array<unknown>
}
export interface TransferDeleteByAppResult {
  uuid: string
  num: string
  from_type: string
  to_type: string
}
export interface TransferCancelResult {
  uuid: string
  num: string
  from_type: string
  to_type: string
}
export interface TransferPublicUrlResult {
  expires_at: string
  url: string
}
export interface TransferCreateOpts {
  from_url: string
  from_name: string
  to_url: string | null
  to_name?: string
}
export interface TransferCreateResult {
  uuid: string
  num?: string
  from_type: string
  to_type: string
}
export interface TransferScheduleListResult {
  [key: string]: unknown
}
export interface TransferScheduleCreateOpts {
  hour: number
  timezone: string
}
export interface TransferScheduleCreateResult {
  uuid: string
  name: string
  callback_url: string
  days: Array<string>
  hour: number
  timezone: string
  retain_weeks: number
  retain_months: number
}
export interface TransferScheduleDeleteResult {
  uuid: string
  name: string
  callback_url: string
  days: Array<string>
  hour: number
  timezone: string
  retain_weeks: number
  retain_months: number
}

export interface HerokuClient {
  backup: {
    create(name: string): Promise<BackupCreateResult>
  }

  burstStatus: {
    info(name: string): Promise<BurstStatusInfoResult>
  }

  connectionPooling: {
    info(name: string): Promise<ConnectionPoolingInfoResult>
    create(name: string, requestBody: ConnectionPoolingCreateOpts): Promise<ConnectionPoolingCreateResult>
  }

  database: {
    info(name: string): Promise<DatabaseInfoResult>
    connectionReset(name: string): Promise<DatabaseConnectionResetResult>
    reset(name: string): Promise<DatabaseResetResult>
    unfollow(name: string): Promise<DatabaseUnfollowResult>
    cancelUpgrade(name: string): Promise<DatabaseCancelUpgradeResult>
    dryRunUpgrade(name: string): Promise<DatabaseDryRunUpgradeResult>
    prepareUpgrade(name: string): Promise<DatabasePrepareUpgradeResult>
    runUpgrade(name: string): Promise<DatabaseRunUpgradeResult>
    upgradeWaitStatus(name: string): Promise<unknown>  // TODO: no spec coverage — schema unknown
    waitStatus(name: string): Promise<DatabaseWaitStatusResult>
  }

  link: {
    list(name: string): Promise<LinkListResult>
    create(name: string, requestBody: LinkCreateOpts): Promise<LinkCreateResult>
    delete(name: string, link_id: string): Promise<LinkDeleteResult>
    info(name: string, link_id: string): Promise<LinkInfoResult>
  }

  maintenance: {
    info(uuid: string): Promise<MaintenanceInfoResult>
    infoByApp(uuid: string): Promise<MaintenanceInfoByAppResult>
    history(uuid: string): Promise<MaintenanceHistoryResult>
    run(uuid: string): Promise<MaintenanceRunResult>
    schedule(uuid: string, requestBody: MaintenanceScheduleOpts): Promise<MaintenanceScheduleResult>
    window(uuid: string): Promise<MaintenanceWindowResult>
    updateWindow(uuid: string, requestBody: MaintenanceUpdateWindowOpts): Promise<MaintenanceUpdateWindowResult>
  }

  metrics: {
    info(name: string): Promise<MetricsInfoResult>
  }

  postgres: {
    info(uuid: string): Promise<PostgresInfoResult>
    waitStatus(uuid: string): Promise<PostgresWaitStatusResult>
    rotateCredentials(uuid: string): Promise<PostgresRotateCredentialsResult>
    runUpgrade(uuid: string, requestBody: PostgresRunUpgradeOpts): Promise<PostgresRunUpgradeResult>
  }

  postgresCredential: {
    list(uuid: string): Promise<PostgresCredentialListResult>
    create(uuid: string, requestBody: PostgresCredentialCreateOpts): Promise<PostgresCredentialCreateResult>
    delete(uuid: string, cred_name: string): Promise<unknown>  // TODO: no spec coverage — schema unknown
    info(uuid: string, cred_name: string): Promise<PostgresCredentialInfoResult>
    rotate(uuid: string, cred_name: string): Promise<PostgresCredentialRotateResult>
  }

  postgresDatabase: {
    config(name: string): Promise<PostgresDatabaseConfigResult>
    updateConfig(name: string, requestBody: PostgresDatabaseUpdateConfigOpts): Promise<PostgresDatabaseUpdateConfigResult>
    listCredentials(name: string): Promise<PostgresDatabaseListCredentialsResult>
    createCredentials(name: string, requestBody: PostgresDatabaseCreateCredentialsOpts): Promise<PostgresDatabaseCreateCredentialsResult>
    rotateCredentials(name: string): Promise<PostgresDatabaseRotateCredentialsResult>
    deleteCredential(name: string, cred_name: string): Promise<PostgresDatabaseDeleteCredentialResult>
    infoCredential(name: string, cred_name: string): Promise<PostgresDatabaseInfoCredentialResult>
    rotateCredential(name: string, cred_name: string): Promise<PostgresDatabaseRotateCredentialResult>
    repairDefault(name: string): Promise<unknown>  // TODO: no spec coverage — schema unknown
  }

  postgresLevel: {
    info(tier: string): Promise<PostgresLevelInfoResult>
  }

  postgresPool: {
    create(uuid: string, requestBody: PostgresPoolCreateOpts): Promise<PostgresPoolCreateResult>
    delete(uuid: string, pool_id: string): Promise<PostgresPoolDeleteResult>
    info(uuid: string, pool_id: string): Promise<PostgresPoolInfoResult>
    update(uuid: string, pool_id: string, requestBody: PostgresPoolUpdateOpts): Promise<PostgresPoolUpdateResult>
  }

  postgresQuota: {
    list(uuid: string): Promise<PostgresQuotaListResult>
    info(uuid: string, quota_type: string): Promise<PostgresQuotaInfoResult>
    update(uuid: string, quota_type: string, requestBody: PostgresQuotaUpdateOpts): Promise<PostgresQuotaUpdateResult>
  }

  postgresSettings: {
    info(uuid: string): Promise<PostgresSettingsInfoResult>
    update(uuid: string, requestBody: PostgresSettingsUpdateOpts): Promise<PostgresSettingsUpdateResult>
  }

  redis: {
    info(name: string): Promise<RedisInfoResult>
    config(name: string): Promise<RedisConfigResult>
    updateConfig(name: string, requestBody: RedisUpdateConfigOpts): Promise<RedisUpdateConfigResult>
    rotateCredentials(name: string): Promise<RedisRotateCredentialsResult>
    resetStats(name: string): Promise<RedisResetStatsResult>
    upgrade(name: string, requestBody: RedisUpgradeOpts): Promise<RedisUpgradeResult>
    wait(name: string): Promise<RedisWaitResult>
  }

  restore: {
    create(name: string): Promise<RestoreCreateResult>
  }

  transfer: {
    listByApp(name: string): Promise<TransferListByAppResult>
    infoByApp(name: string, xfer_id: string): Promise<TransferInfoByAppResult>
    deleteByApp(name: string, xfer_id: string): Promise<TransferDeleteByAppResult>
    cancel(name: string, xfer_id: string): Promise<TransferCancelResult>
    publicUrl(name: string, xfer_id: string): Promise<TransferPublicUrlResult>
    list(name: string): Promise<unknown>  // TODO: no spec coverage — schema unknown
    create(name: string, requestBody: TransferCreateOpts): Promise<TransferCreateResult>
  }

  transferSchedule: {
    list(name: string): Promise<TransferScheduleListResult>
    create(name: string, requestBody: TransferScheduleCreateOpts): Promise<TransferScheduleCreateResult>
    delete(name: string, schedule_id: string): Promise<TransferScheduleDeleteResult>
  }

}
