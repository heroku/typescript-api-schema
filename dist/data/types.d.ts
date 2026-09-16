/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

/** Result of a backup capture, returned by Transferatu. */
export interface BackupCreateResult {
  uuid: string
  from_type: string
  to_type: string
}

/** Recent burst-balance observation for a database, used to assess IO headroom. */
export interface BurstStatusInfoResult {
  addon_name: string
  addon_id: string
  /** Timestamp of the observation. */
  at: string
  burst_status: {
    volumebalance: {
      latest_value: number
      slope: number
    }
  }
}

export interface ConnectionPoolingInfoResult {
  /** Whether connection pooling is enabled for the database. */
  status: 'enabled' | 'disabled'
  /** Human-readable description of the pooling status. */
  message: string
}

export interface ConnectionPoolingCreateOpts {
  /** Optional name for the connection pooling attachment. */
  name?: string
  /** Database credential to associate with the pool. Defaults to "default". */
  credential?: string
  /** Heroku app to attach the pool to. Defaults to the addon's owning app. */
  app?: string
}

export interface ConnectionPoolingCreateResult {
  /** Name assigned to the new connection pooling attachment. */
  name?: string
}

/**
 * Information about a Heroku PostgreSQL database (legacy v11 client format).
 * 
 */
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
  'waiting?'?: boolean
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

export interface DatabaseResetOpts {
  /** Array of extension names to install after reset */
  extensions?: Array<string>
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

/**
 * Options for a Postgres version upgrade. If version is omitted, the default target version is used.
 * 
 */
export interface DatabaseDryRunUpgradeOpts {
  /** Target Postgres major version to upgrade to (e.g., "17"). If not provided, the default version is used. */
  version?: string
}

export interface DatabaseDryRunUpgradeResult {
  message: string
}

/**
 * Options for a Postgres version upgrade. If version is omitted, the default target version is used.
 * 
 */
export interface DatabasePrepareUpgradeOpts {
  /** Target Postgres major version to upgrade to (e.g., "17"). If not provided, the default version is used. */
  version?: string
}

export interface DatabasePrepareUpgradeResult {
  message: string
}

/**
 * Options for a Postgres version upgrade. If version is omitted, the default target version is used.
 * 
 */
export interface DatabaseRunUpgradeOpts {
  /** Target Postgres major version to upgrade to (e.g., "17"). If not provided, the default version is used. */
  version?: string
}

export interface DatabaseRunUpgradeResult {
  message: string
}

/**
 * Status of an in-progress or scheduled Postgres version upgrade.
 * 
 */
export interface DatabaseUpgradeWaitStatusResult {
  message: string
  'waiting?': boolean
  /** Present and true when the upgrade has errored. */
  'error?'?: boolean
  /** Progress step indicator during an in-place upgrade, when applicable. */
  step?: string
}

export interface DatabaseWaitStatusResult {
  message: string
  'waiting?': boolean
}

export interface DatabaseExpensiveQueriesResult {
  queries?: Array<{
    query_id?: string
    text?: string
    observations?: Array<{
      time?: string
      time_spent?: number
      average_time?: number
      calls?: number
      read_time?: number
      write_time?: number
    }>
  }>
}

/** List of active dataset links. Schema is intentionally open. */
export type LinkListResult = Record<string, unknown>

export interface LinkCreateOpts {
  /** Name or id of the remote Postgres service to link to. */
  target: string
  /** Optional name to register the link under. */
  as?: string
}

/** A dataset link between two Postgres databases. */
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

/** A dataset link between two Postgres databases. */
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

/** A dataset link between two Postgres databases. */
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
    window?: string | null
  }
  app: {
    name: string
    uuid: string
  }
  window?: string | null
  /** The current status of the maintenance. Always present, even when no maintenance is scheduled (will be "none" in that case). */
  status: 'none' | 'preparing' | 'ready' | 'running' | 'completed' | 'unknown'
  required_by?: string | null
  scheduled_for?: string | null
  method?: string | null
  addon_description?: string | null
  started_at?: string | null
  completed_at?: string | null
  duration_seconds?: number | null
  reason?: 'routine_maintenance' | 'customer_request' | 'hardware_issue' | null
  server_created_at?: string | null
  previously_scheduled_for?: string | null
  customer_requested?: boolean
}

export interface MaintenanceInfoByAppResult {
  /** Array of maintenance objects, one per addon. Includes addons with no scheduled maintenance (status will be "none"). */
  maintenances: Array<{
    addon: {
      uuid: string
      name: string
      attachments: Array<string>
      kind: string
      plan: string
      window?: string | null
    }
    app: {
      name: string
      uuid: string
    }
    window?: string | null
    /** The current status of the maintenance. Always present, even when no maintenance is scheduled (will be "none" in that case). */
    status: 'none' | 'preparing' | 'ready' | 'running' | 'completed' | 'unknown'
    required_by?: string | null
    scheduled_for?: string | null
    method?: string | null
    addon_description?: string | null
    started_at?: string | null
    completed_at?: string | null
    duration_seconds?: number | null
    reason?: 'routine_maintenance' | 'customer_request' | 'hardware_issue' | null
    server_created_at?: string | null
    previously_scheduled_for?: string | null
    customer_requested?: boolean
  }>
}

export interface MaintenanceHistoryResult {
  /** Array of maintenance objects, one per addon. Includes addons with no scheduled maintenance (status will be "none"). */
  maintenances: Array<{
    addon: {
      uuid: string
      name: string
      attachments: Array<string>
      kind: string
      plan: string
      window?: string | null
    }
    app: {
      name: string
      uuid: string
    }
    window?: string | null
    /** The current status of the maintenance. Always present, even when no maintenance is scheduled (will be "none" in that case). */
    status: 'none' | 'preparing' | 'ready' | 'running' | 'completed' | 'unknown'
    required_by?: string | null
    scheduled_for?: string | null
    method?: string | null
    addon_description?: string | null
    started_at?: string | null
    completed_at?: string | null
    duration_seconds?: number | null
    reason?: 'routine_maintenance' | 'customer_request' | 'hardware_issue' | null
    server_created_at?: string | null
    previously_scheduled_for?: string | null
    customer_requested?: boolean
  }>
}

export interface MaintenanceRunResult {
  message: string
}

export interface MaintenanceScheduleOpts {
  delay_weeks?: number | null
}

export type MaintenanceScheduleResult = {
  addon: {
    uuid: string
    name: string
    attachments: Array<string>
    kind: string
    plan: string
    window?: string | null
  }
  app: {
    name: string
    uuid: string
  }
  window?: string | null
  /** The current status of the maintenance. Always present, even when no maintenance is scheduled (will be "none" in that case). */
  status: 'none' | 'preparing' | 'ready' | 'running' | 'completed' | 'unknown'
  required_by?: string | null
  scheduled_for?: string | null
  method?: string | null
  addon_description?: string | null
  started_at?: string | null
  completed_at?: string | null
  duration_seconds?: number | null
  reason?: 'routine_maintenance' | 'customer_request' | 'hardware_issue' | null
  server_created_at?: string | null
  previously_scheduled_for?: string | null
  customer_requested?: boolean
} & {
  previously_scheduled_for?: string | null
  customer_requested?: boolean
}

export interface MaintenanceWindowResult {
  window?: string | null
  previous_window?: string | null
  scheduled_for?: string | null
  previously_scheduled_for?: string | null
}

export interface MaintenanceUpdateWindowOpts {
  time_of_day: string
  day_of_week: string
}

export interface MaintenanceUpdateWindowResult {
  window?: string | null
  previous_window?: string | null
  scheduled_for?: string | null
  previously_scheduled_for?: string | null
}

/** Database metrics payload. Schema is intentionally open. */
export type MetricsInfoResult = Record<string, unknown>

/** A Heroku PostgreSQL Performance Tier database. */
export interface PostgresInfoResult {
  /** The associated Heroku app for a database cluster. */
  app: {
    /** Unique identifier for the app */
    id: string
    name: string
  }
  /** The associated Heroku addon for a database cluster. */
  addon: {
    /** Unique identifier for the addon */
    id: string
    name: string
  }
  version: string
  region: 'us' | 'eu' | 'tokyo' | 'mumbai' | 'singapore' | 'sydney' | 'montreal' | 'frankfurt' | 'dublin' | 'london' | 'paris' | 'virginia' | 'ohio' | 'california' | 'oregon'
  tier: 'performance'
  /** Status of the database. 'migrating' indicates an active migration to this database is in progress. */
  status: 'provisioning' | 'available' | 'modifying' | 'unavailable' | 'migrating'
  created_at: string
  forked_from: {
    /** Unique identifier for the addon */
    id: string
    name: string
  } | null
  features: {
    continuous_protection: {
      enabled?: boolean
    }
    credentials: {
      enabled?: boolean
      current_count?: number
    }
    data_encryption: {
      enabled?: boolean
    }
    fork: {
      enabled?: boolean
    }
    highly_available: {
      enabled?: boolean
    }
    rollback: {
      enabled?: boolean
      earliest_time?: string
      latest_time?: string
    }
  }
  quotas: Array<{
    /** Type of quota */
    type: 'storage'
    /** Current storage usage in gigabytes */
    current_gb: number | null
    /** Warning threshold in gigabytes */
    warning_gb: number | null
    /** Critical threshold in gigabytes */
    critical_gb: number | null
    /**
     * Action taken when quota is exceeded.
     * * **restrict** - Revokes CREATE/INSERT privileges and limits connections to 1.
     *   Data can still be read and deleted to bring your database into compliance.
     * * **notify** - Notify the customer that their database has exceeded its critical threshold and take no further action.
     * * **none** - Do nothing and incur additional costs.
     * 
     */
    enforcement_action: 'restrict' | 'notify' | 'none'
    /** Whether enforcement is currently active */
    enforcement_active: boolean
  }>
  plan_limits?: Array<{
    /** Name of plan limit */
    name: 'table-limit'
    /** Current number of tables */
    current: number
    /** Limit threshold for number of tables */
    limit: number
  } | {
    /** Name of plan limit */
    name: 'storage-limit-in-gb'
    /** Current storage limit */
    current: number
    /** Limit on storage */
    limit: number
  }>
  pools: Array<{
    /** Unique identifier for the compute pool */
    id?: string
    name: string
    /** The expected level of all instances in the pool. All instances should eventually reach this expected level. */
    expected_level: string
    /** The expected count of instances in the pool. The pool should eventually reach this expected count of instances. */
    expected_count: number
    /** The expected connection limit for the pool given the expected_count and expected_level */
    expected_connection_limit: number
    /** The count of currently used connections */
    connections_used: number | null
    status?: 'provisioning' | 'available' | 'modifying' | 'unknown'
    endpoints?: Array<{
      host: string
      port: number
      status: 'available' | 'modifying' | 'degraded' | 'deprovisioning'
    }>
    compute_instances: Array<{
      id?: string
      name?: string
      level?: string
      role?: string
      status?: string
      updated_at?: string
      /** source identifier to look up instance-level metrics */
      metrics_source?: string
    }>
  }>
  /** source identifiers to be used to look up metrics for this tenant at different levels */
  metrics_sources: {
    /** source identifier to look up cluster-level metrics, null if unavailable */
    cluster?: string | null
    /** source identifier to look up database-level metrics, null if unavailable */
    database?: string | null
    /** source identifier to look up leader instance-level metrics, null if unavailable */
    leader?: string | null
  }
  /** Represents the wait status of a PostgreSQL database, indicating whether the database is currently waiting for provisioning or other operations to complete. When an active migration is in progress, this will return waiting=true with message="Migrating". */
  wait_status: {
    /** Whether the database has an operation to wait for */
    waiting: boolean
    /** Human-readable message describing the current wait status. Can be 'Provisioning', 'Migrating', 'Updating', or other status messages. */
    message: string | null
  }
}

/** Represents the wait status of a PostgreSQL database, indicating whether the database is currently waiting for provisioning or other operations to complete. When an active migration is in progress, this will return waiting=true with message="Migrating". */
export interface PostgresWaitStatusResult {
  /** Whether the database has an operation to wait for */
  waiting: boolean
  /** Human-readable message describing the current wait status. Can be 'Provisioning', 'Migrating', 'Updating', or other status messages. */
  message: string | null
}

export interface PostgresRotateCredentialsOpts {
  /** Immediately kills all connections and performs rotations on all credentials. */
  forced?: boolean
}

export interface PostgresRotateCredentialsResult {
  /** Confirmation message of the rotation */
  message: string
}

export interface PostgresRunUpgradeOpts {
  /** Target Postgres version to upgrade to (e.g., "17"). If not provided, the default version will be used. */
  version?: string
}

export interface PostgresRunUpgradeResult {
  /** Confirmation message of the upgrade request */
  message: string
}

export interface PostgresResetOpts {
  /** Array of extension names to install */
  extensions?: Array<string>
}

export interface PostgresDiagnoseResult {
  created_at: string
  items: Array<{
    /** Field name of the check */
    name: string
    /** Human-readable summary of the check */
    summary: string
    /** Status of the check */
    status: 'skipped' | 'green' | 'yellow' | 'red'
    results: Array<Record<string, unknown>>
  }>
}

export interface PostgresExpensiveQueriesResult {
  items?: Array<{
    query_id?: number
    text?: string
    observations?: Array<{
      /** Time bucket */
      time?: string
      /** Query invocation time */
      time_spent?: number
      /** Average time spent per query */
      average_time?: number
      /** Query invocation count */
      calls?: number
      /** Query invocation read time in ms */
      read_time?: number
      /** Query invocation write time in ms */
      write_time?: number
    }>
  }>
}

export interface PostgresCredentialListResult {
  items: Array<{
    /** Unique identifier for the credential */
    id: string
    /** Name of the credential */
    name: string
    created_at: string
    /** Type of the credential store */
    type: 'owner' | 'additional'
    /** Current state of the credential */
    state: 'enabling' | 'rotating' | 'revoking' | 'active'
    /** Database name */
    database: string
    /** Database host */
    host: string
    /** Database port */
    port: number
    roles: Array<{
      /** Database user name */
      user: string
      /** Database password */
      password: string
      /** State of the role */
      state: 'enabling' | 'rotating' | 'revoking' | 'active'
    }>
  }>
}

export interface PostgresCredentialCreateOpts {
  /** Name of the credential to create */
  name: string
}

export interface PostgresCredentialCreateResult {
  /** Unique identifier for the credential */
  id: string
  /** Name of the credential */
  name: string
  created_at: string
  /** Type of the credential store */
  type: 'owner' | 'additional'
  /** Current state of the credential */
  state: 'enabling' | 'rotating' | 'revoking' | 'active'
  /** Database name */
  database: string
  /** Database host */
  host: string
  /** Database port */
  port: number
  roles: Array<{
    /** Database user name */
    user: string
    /** Database password */
    password: string
    /** State of the role */
    state: 'enabling' | 'rotating' | 'revoking' | 'active'
  }>
}

export interface PostgresCredentialInfoResult {
  /** Unique identifier for the credential */
  id: string
  /** Name of the credential */
  name: string
  created_at: string
  /** Type of the credential store */
  type: 'owner' | 'additional'
  /** Current state of the credential */
  state: 'enabling' | 'rotating' | 'revoking' | 'active'
  /** Database name */
  database: string
  /** Database host */
  host: string
  /** Database port */
  port: number
  roles: Array<{
    /** Database user name */
    user: string
    /** Database password */
    password: string
    /** State of the role */
    state: 'enabling' | 'rotating' | 'revoking' | 'active'
  }>
}

export interface PostgresCredentialRotateOpts {
  /** Immediately kills all connections to the credential and performs the rotation. */
  forced?: boolean
}

/**
 * Current values for tunable Postgres / pgbouncer configuration knobs.
 * All fields are optional; only knobs supported by the database tier are returned.
 * 
 */
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
  /** Configuration setting whose value is one of a fixed set of strings. */
  log_statement?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
  }
  /** Configuration setting whose value is one of a fixed set of strings. */
  track_functions?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
  }
  /** Configuration setting whose value is one of a fixed set of strings. */
  log_min_error_statement?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
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
  /** Configuration setting whose value is one of a fixed set of strings. */
  'auto_explain.log_format'?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
  }
  'auto_explain.log_min_duration'?: {
    value: number
    desc: string
    default: number
  }
  'auto_explain.log_analyze'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_triggers'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_buffers'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_verbose'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_nested_statements'?: {
    value: boolean
    desc: string
    default: boolean
  }
}

/**
 * Subset of configuration knobs to update. Only the fields provided are changed.
 * 
 */
export interface PostgresDatabaseUpdateConfigOpts {
  track_functions?: string
  log_min_duration_statement?: number
  log_connections?: boolean
}

/**
 * Current values for tunable Postgres / pgbouncer configuration knobs.
 * All fields are optional; only knobs supported by the database tier are returned.
 * 
 */
export interface PostgresDatabaseUpdateConfigResult {
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
  /** Configuration setting whose value is one of a fixed set of strings. */
  log_statement?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
  }
  /** Configuration setting whose value is one of a fixed set of strings. */
  track_functions?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
  }
  /** Configuration setting whose value is one of a fixed set of strings. */
  log_min_error_statement?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
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
  /** Configuration setting whose value is one of a fixed set of strings. */
  'auto_explain.log_format'?: {
    value: string
    desc: string
    default: string
    /** Map of allowed value to human-readable description. */
    values: Record<string, string>
  }
  'auto_explain.log_min_duration'?: {
    value: number
    desc: string
    default: number
  }
  'auto_explain.log_analyze'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_triggers'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_buffers'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_verbose'?: {
    value: boolean
    desc: string
    default: boolean
  }
  'auto_explain.log_nested_statements'?: {
    value: boolean
    desc: string
    default: boolean
  }
}

/** List of credential stores for a Heroku PostgreSQL database. Schema is intentionally open. */
export type PostgresDatabaseListCredentialsResult = Record<string, unknown>

export interface PostgresDatabaseCreateCredentialsOpts {
  /** Name of the credential to create. */
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

/** Details for a specific credential store. */
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

export interface PostgresDatabaseRepairDefaultResult {
  message: string
}

/** Collection of performance levels */
export interface PostgresLevelInfoResult {
  /** Array of individual level objects */
  items: Array<{
    /** Performance level name containing '{size}G' where size is the memory allocation */
    name: string
    /** Number of virtual CPUs */
    vcpu: number
    /** Memory allocation in GB */
    memory_in_gb: number
    /** Maximum number of connections allowed per instance */
    connection_limit: number
  }>
}

export interface PostgresLogicalReplicationEnablePublishingResult {
  message: string
}

export interface PostgresLogicalReplicationEnableSubscribingResult {
  message: string
}

export interface PostgresLogicalReplicationListResult {
  items: Array<{
    name: string
    /** Database role that owns the publication. */
    owner: string
    target: {
      type: 'tables'
      tables: Array<string>
      automatically_includes_new_tables: boolean
      automatically_includes_new_schemas: boolean
    } | {
      type: 'schemas'
      schemas: Array<string>
      automatically_includes_new_tables: boolean
      automatically_includes_new_schemas: boolean
    }
    /** Fully-qualified tables currently included in the publication. */
    current_tables: Array<string>
  }>
  /** Number of publications returned in `items`. */
  count: number
  /** Maximum number of publications returned by the collection endpoint. */
  limit: number
}

export interface PostgresLogicalReplicationCreateOpts {
  name: string
  /**
   * The database objects published through logical replication. A `tables` target
   * includes exactly the specified tables. A `schemas` target includes existing and
   * newly-created tables in its specified schemas. An `all_customer_schemas` target
   * resolves to all currently eligible customer schemas when the publication is created;
   * it requires Postgres 15 or later.
   * 
   */
  target: {
    type: 'tables'
    tables: Array<string>
  } | {
    type: 'schemas'
    schemas: Array<string>
  } | {
    type: 'all_customer_schemas'
  }
}

export interface PostgresLogicalReplicationInfoResult {
  name: string
  /** Database role that owns the publication. */
  owner: string
  target: {
    type: 'tables'
    tables: Array<string>
    automatically_includes_new_tables: boolean
    automatically_includes_new_schemas: boolean
  } | {
    type: 'schemas'
    schemas: Array<string>
    automatically_includes_new_tables: boolean
    automatically_includes_new_schemas: boolean
  }
  /** Fully-qualified tables currently included in the publication. */
  current_tables: Array<string>
}

export interface PostgresLogicalReplicationUpdateOpts {
  /**
   * The database objects published through logical replication. A `tables` target
   * includes exactly the specified tables. A `schemas` target includes existing and
   * newly-created tables in its specified schemas. An `all_customer_schemas` target
   * resolves to all currently eligible customer schemas when the publication is created;
   * it requires Postgres 15 or later.
   * 
   */
  target: {
    type: 'tables'
    tables: Array<string>
  } | {
    type: 'schemas'
    schemas: Array<string>
  } | {
    type: 'all_customer_schemas'
  }
}

export interface PostgresMigrationCreateOpts {
  /** Source addon UUID to migrate from */
  source_id: string
  /** Migration method to use */
  method?: 'cdc' | 'full-load' | 'assess-only'
  /** Whether to automatically promote the target after migration completes */
  auto_promote?: boolean
}

/** Database migration status and details */
export interface PostgresMigrationCreateResult {
  /** Unique identifier for the migration */
  id: string
  /** Current status of the migration */
  status: 'creating_target' | 'preparing' | 'migrating' | 'completed' | 'failed' | 'cancelled' | 'ready' | 'promoting' | 'unknown'
  /** Full-load migration progress as a percentage. Null if full-load hasn't started or when using CDC-only migration. */
  full_load_progress: number | null
  /** CDC replication lag in seconds between source and target. Null if CDC is not active or hasn't started. */
  cdc_lag: number | null
  /** Collection of preassessment check results for database migration */
  preassessment_results: Array<{
    /** Name of the preassessment check */
    name: string
    /** Result of the preassessment check */
    result: 'passed' | 'failed' | 'warning' | 'error' | 'cancelled' | 'skipped' | 'pending' | 'running'
    /** Description of the check result or failure details. Typically only populated for failed, warning, or error checks. */
    description?: string | null
    /** When the check was last executed */
    checked_at?: string | null
  }>
  /** Whether the target will be automatically promoted after migration completes */
  auto_promote: boolean
  /** Whether the migration has completed */
  completed: boolean
  /** Whether the migration completed successfully */
  successful: boolean
  /** Source addon identifier */
  source_id: string
  /** Target addon identifier */
  target_id: string
  /** The most recent error message if the migration failed or encountered issues */
  last_error_message?: string | null
  /** The reason why the migration stopped, as returned by AWS DMS */
  stop_reason?: string | null
  /** Number of tables that encountered errors during migration */
  tables_errored?: number | null
  status_description: string | null
}

/** Database migration status and details */
export interface PostgresMigrationInfoResult {
  /** Unique identifier for the migration */
  id: string
  /** Current status of the migration */
  status: 'creating_target' | 'preparing' | 'migrating' | 'completed' | 'failed' | 'cancelled' | 'ready' | 'promoting' | 'unknown'
  /** Full-load migration progress as a percentage. Null if full-load hasn't started or when using CDC-only migration. */
  full_load_progress: number | null
  /** CDC replication lag in seconds between source and target. Null if CDC is not active or hasn't started. */
  cdc_lag: number | null
  /** Collection of preassessment check results for database migration */
  preassessment_results: Array<{
    /** Name of the preassessment check */
    name: string
    /** Result of the preassessment check */
    result: 'passed' | 'failed' | 'warning' | 'error' | 'cancelled' | 'skipped' | 'pending' | 'running'
    /** Description of the check result or failure details. Typically only populated for failed, warning, or error checks. */
    description?: string | null
    /** When the check was last executed */
    checked_at?: string | null
  }>
  /** Whether the target will be automatically promoted after migration completes */
  auto_promote: boolean
  /** Whether the migration has completed */
  completed: boolean
  /** Whether the migration completed successfully */
  successful: boolean
  /** Source addon identifier */
  source_id: string
  /** Target addon identifier */
  target_id: string
  /** The most recent error message if the migration failed or encountered issues */
  last_error_message?: string | null
  /** The reason why the migration stopped, as returned by AWS DMS */
  stop_reason?: string | null
  /** Number of tables that encountered errors during migration */
  tables_errored?: number | null
  status_description: string | null
}

export interface PostgresPoolCreateOpts {
  /** Name of the pool. If not provided, a default name will be generated (e.g., 'loyal-pool-63063'). Must be 3-32 characters inclusive, begin with a letter, contain only ASCII letters/digits/hyphens, and not end with a hyphen or contain consecutive hyphens. */
  name?: string
  /** Level name */
  level: string
  /** Number of instances in the pool */
  count: number
}

/**
 * A collection of compute instances that are part of a database cluster and
 * behind similar connection endpoints.
 * 
 */
export interface PostgresPoolCreateResult {
  /** Unique identifier for the compute pool */
  id?: string
  name: string
  /** The expected level of all instances in the pool. All instances should eventually reach this expected level. */
  expected_level: string
  /** The expected count of instances in the pool. The pool should eventually reach this expected count of instances. */
  expected_count: number
  /** The expected connection limit for the pool given the expected_count and expected_level */
  expected_connection_limit: number
  /** The count of currently used connections */
  connections_used: number | null
  status?: 'provisioning' | 'available' | 'modifying' | 'unknown'
  endpoints?: Array<{
    host: string
    port: number
    status: 'available' | 'modifying' | 'degraded' | 'deprovisioning'
  }>
  compute_instances: Array<{
    id?: string
    name?: string
    level?: string
    role?: string
    status?: string
    updated_at?: string
    /** source identifier to look up instance-level metrics */
    metrics_source?: string
  }>
}

/**
 * A collection of compute instances that are part of a database cluster and
 * behind similar connection endpoints.
 * 
 */
export interface PostgresPoolInfoResult {
  /** Unique identifier for the compute pool */
  id?: string
  name: string
  /** The expected level of all instances in the pool. All instances should eventually reach this expected level. */
  expected_level: string
  /** The expected count of instances in the pool. The pool should eventually reach this expected count of instances. */
  expected_count: number
  /** The expected connection limit for the pool given the expected_count and expected_level */
  expected_connection_limit: number
  /** The count of currently used connections */
  connections_used: number | null
  status?: 'provisioning' | 'available' | 'modifying' | 'unknown'
  endpoints?: Array<{
    host: string
    port: number
    status: 'available' | 'modifying' | 'degraded' | 'deprovisioning'
  }>
  compute_instances: Array<{
    id?: string
    name?: string
    level?: string
    role?: string
    status?: string
    updated_at?: string
    /** source identifier to look up instance-level metrics */
    metrics_source?: string
  }>
}

export interface PostgresPoolUpdateOpts {
  /** Name of the pool */
  name?: string
  /** Level name */
  level?: string
  /** Number of instances in the pool */
  count?: number
}

/**
 * A collection of compute instances that are part of a database cluster and
 * behind similar connection endpoints.
 * 
 */
export interface PostgresPoolUpdateResult {
  /** Unique identifier for the compute pool */
  id?: string
  name: string
  /** The expected level of all instances in the pool. All instances should eventually reach this expected level. */
  expected_level: string
  /** The expected count of instances in the pool. The pool should eventually reach this expected count of instances. */
  expected_count: number
  /** The expected connection limit for the pool given the expected_count and expected_level */
  expected_connection_limit: number
  /** The count of currently used connections */
  connections_used: number | null
  status?: 'provisioning' | 'available' | 'modifying' | 'unknown'
  endpoints?: Array<{
    host: string
    port: number
    status: 'available' | 'modifying' | 'degraded' | 'deprovisioning'
  }>
  compute_instances: Array<{
    id?: string
    name?: string
    level?: string
    role?: string
    status?: string
    updated_at?: string
    /** source identifier to look up instance-level metrics */
    metrics_source?: string
  }>
}

export interface PostgresProvisioningCreateOpts {
  callback_url: string
  heroku_id: string
  name: string
  region: string
  uuid: string
  oauth_grant?: {
    code?: string
    expires_at?: string
    type?: 'authorization_code'
  }
  logplex_token: string
  log_input_url: string
}

export interface PostgresProvisioningUpdateOpts {
  plan?: string
}

export interface PostgresProvisioningAttachOpts {
  name?: string
  config?: {
    pool?: string
    credential?: string
    proxy?: boolean
  }
}

export interface PostgresProvisioningAttachResult {
  config?: Record<string, unknown>
  name?: string
}

export interface PostgresQuotaListResult {
  items?: Array<{
    /** Type of quota */
    type: 'storage'
    /** Current storage usage in gigabytes */
    current_gb: number | null
    /** Warning threshold in gigabytes */
    warning_gb: number | null
    /** Critical threshold in gigabytes */
    critical_gb: number | null
    /**
     * Action taken when quota is exceeded.
     * * **restrict** - Revokes CREATE/INSERT privileges and limits connections to 1.
     *   Data can still be read and deleted to bring your database into compliance.
     * * **notify** - Notify the customer that their database has exceeded its critical threshold and take no further action.
     * * **none** - Do nothing and incur additional costs.
     * 
     */
    enforcement_action: 'restrict' | 'notify' | 'none'
    /** Whether enforcement is currently active */
    enforcement_active: boolean
  }>
}

export type PostgresQuotaInfoResult = {
  /** Type of quota */
  type: 'storage'
  /** Current storage usage in gigabytes */
  current_gb: number | null
  /** Warning threshold in gigabytes */
  warning_gb: number | null
  /** Critical threshold in gigabytes */
  critical_gb: number | null
  /**
   * Action taken when quota is exceeded.
   * * **restrict** - Revokes CREATE/INSERT privileges and limits connections to 1.
   *   Data can still be read and deleted to bring your database into compliance.
   * * **notify** - Notify the customer that their database has exceeded its critical threshold and take no further action.
   * * **none** - Do nothing and incur additional costs.
   * 
   */
  enforcement_action: 'restrict' | 'notify' | 'none'
  /** Whether enforcement is currently active */
  enforcement_active: boolean
}

export type PostgresQuotaUpdateOpts = {
  /** Warning threshold for storage quota in gigabytes. Pass null to unset this value. */
  warning_gb?: number | null
  /** Critical threshold for storage quota in gigabytes. Pass null to unset this value. */
  critical_gb?: number | null
  /**
   * Action to take when quota is exceeded.
   * 
   * * **restrict** - Revokes CREATE/INSERT privileges and limits connections to 1.
   *   Data can still be read and deleted to bring your database into compliance.
   * * **notify** - Notify the customer that their database has exceeded its critical threshold and take no further action.
   * * **none** - Do nothing and incur additional costs.
   * 
   */
  enforcement_action?: 'restrict' | 'notify' | 'none'
}

export type PostgresQuotaUpdateResult = {
  /** Type of quota */
  type: 'storage'
  /** Current storage usage in gigabytes */
  current_gb: number | null
  /** Warning threshold in gigabytes */
  warning_gb: number | null
  /** Critical threshold in gigabytes */
  critical_gb: number | null
  /**
   * Action taken when quota is exceeded.
   * * **restrict** - Revokes CREATE/INSERT privileges and limits connections to 1.
   *   Data can still be read and deleted to bring your database into compliance.
   * * **notify** - Notify the customer that their database has exceeded its critical threshold and take no further action.
   * * **none** - Do nothing and incur additional costs.
   * 
   */
  enforcement_action: 'restrict' | 'notify' | 'none'
  /** Whether enforcement is currently active */
  enforcement_active: boolean
}

/** Collection of database settings */
export interface PostgresSettingsInfoResult {
  /** Array of individual setting objects */
  items: Array<{
    /** Name of the setting */
    name: string
    /** Current value of the setting */
    current: string | number | boolean
    /** Default value of the setting */
    default: string | number | boolean
    /** Whether a reboot is required to apply changes */
    reboot_required: boolean
    /** Description of the setting */
    description: string
    /** The user-configured override value for the setting, or null if not overridden */
    override: string | number | boolean | null
  }>
}

export interface PostgresSettingsUpdateOpts {
  /** Comma-separated list of setting name-value pairs */
  settings: string
}

export interface PostgresSettingsUpdateResult {
  changes?: Array<{
    /** Name of the setting that was changed */
    name: string
    /** Previous value of the setting */
    previous: string | number | boolean | null
    /** New value of the setting */
    current: string | number | boolean | null
  }>
}

/**
 * Information about a Heroku Key-Value Store database.
 * 
 */
export interface RedisInfoResult {
  addon_id?: string
  name?: string
  plan?: string
  created_at?: string
  formation?: {
    id?: string
    /** UUID of the primary service, or null before one is assigned. */
    primary?: string | null
  }
  metaas_source?: string | null
  port?: number | null
  resource_url?: string | null
  /** Observed Valkey version, falling back to the configured version. */
  version?: string | null
  /** Whether clients should connect using native TLS. */
  prefer_native_tls?: boolean | null
  /** ARN of the customer-managed encryption key, present only when BYOK is configured. */
  customer_encryption_key?: string
  /** Human-readable name/value rows shown by the CLI (e.g. Plan, Status, Version, Maxmemory). */
  info?: Array<{
    name: string
    values: Array<string | number>
  }>
}

/**
 * Map of configurable Valkey settings keyed by setting name. The set of keys is
 * determined by the database and may change over time; known customer-facing
 * settings include timeout, maxmemory_policy, and notify_keyspace_events.
 * 
 */
export type RedisConfigResult = Record<string, {
  value: string | number | boolean
  desc: string
  default: string | number | boolean
  /** For enumerated settings, a map of allowed value to its description. */
  values?: Record<string, string>
}>

/**
 * Settings to update on the database. All fields are optional; only the supplied
 * settings are changed.
 * 
 */
export interface RedisUpdateConfigOpts {
  /** How long a client can idle (in seconds) before being disconnected. */
  timeout?: number
  /** Key eviction behavior when the instance reaches max memory. */
  maxmemory_policy?: 'noeviction' | 'allkeys-lru' | 'volatile-lru' | 'allkeys-random' | 'volatile-random' | 'volatile-ttl' | 'allkeys-lfu' | 'volatile-lfu'
  /** Keyspace notification classes to enable (empty string disables them). */
  notify_keyspace_events?: string
}

/**
 * Map of configurable Valkey settings keyed by setting name. The set of keys is
 * determined by the database and may change over time; known customer-facing
 * settings include timeout, maxmemory_policy, and notify_keyspace_events.
 * 
 */
export type RedisUpdateConfigResult = Record<string, {
  value: string | number | boolean
  desc: string
  default: string | number | boolean
  /** For enumerated settings, a map of allowed value to its description. */
  values?: Record<string, string>
}>

export interface RedisRotateCredentialsResult {
  message: string
}

export interface RedisResetStatsResult {
  message: string
}

/**
 * Options for a Valkey version upgrade.
 * 
 */
export interface RedisUpgradeOpts {
  /** Target Valkey major version to upgrade to. */
  version: string
}

export interface RedisUpgradeResult {
  message: string
}

/**
 * Status of any in-progress operation on the database.
 * 
 */
export interface RedisWaitResult {
  /** Human-readable status (e.g. available, preparing, upgrading version, maintenance_running). */
  message: string
  'waiting?': boolean
}

/** Options for initiating a database restore. */
export interface RestoreCreateOpts {
  /** HTTPS URL of the backup to restore from. Plaintext (http) URLs are rejected. */
  backup_url: string
  /** Extension names to preinstall on the restore target. */
  extensions?: Array<string>
}

/** Result of a restore initiation, returned by Transferatu. */
export interface RestoreCreateResult {
  uuid: string
  from_type: string
  to_type: string
}

export type TransferListByAppResult = Array<{
  /** Unique identifier of the transfer (UUID). */
  uuid: string
  /** Sequential transfer number within the app. */
  num: number
  from_name?: string | null
  from_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Source URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  from_url?: string | null
  to_name?: string | null
  to_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Destination URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  to_url?: string | null
  /** Freeform options passed through to transfer workers. */
  options?: Record<string, unknown>
  source_bytes?: number | null
  processed_bytes: number | null
  /** null while in-progress; true on success; false on failure. */
  succeeded?: boolean | null
  warnings: number
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  created_at: string
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  started_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  canceled_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  updated_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  finished_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  deleted_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  purged_at?: string | null
  /** Retention count. */
  num_keep: number
  /** Present only for scheduled transfers. */
  schedule?: {
    /** UUID of the schedule. */
    uuid?: string
  } | null
  /** Present when the request includes ?verbose=true. */
  logs?: Array<{
    /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
    created_at: string
    level: 'info' | 'warning' | 'error'
    message: string
  }>
}>

/**
 * A data transfer (database backup, copy, or restore).
 * Datetime fields are returned as space-separated UTC strings like
 * "2024-05-28 11:19:37 +0000" (not RFC 3339).
 * 
 */
export interface TransferInfoByAppResult {
  /** Unique identifier of the transfer (UUID). */
  uuid: string
  /** Sequential transfer number within the app. */
  num: number
  from_name?: string | null
  from_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Source URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  from_url?: string | null
  to_name?: string | null
  to_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Destination URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  to_url?: string | null
  /** Freeform options passed through to transfer workers. */
  options?: Record<string, unknown>
  source_bytes?: number | null
  processed_bytes: number | null
  /** null while in-progress; true on success; false on failure. */
  succeeded?: boolean | null
  warnings: number
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  created_at: string
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  started_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  canceled_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  updated_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  finished_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  deleted_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  purged_at?: string | null
  /** Retention count. */
  num_keep: number
  /** Present only for scheduled transfers. */
  schedule?: {
    /** UUID of the schedule. */
    uuid?: string
  } | null
  /** Present when the request includes ?verbose=true. */
  logs?: Array<{
    /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
    created_at: string
    level: 'info' | 'warning' | 'error'
    message: string
  }>
}

/**
 * A data transfer (database backup, copy, or restore).
 * Datetime fields are returned as space-separated UTC strings like
 * "2024-05-28 11:19:37 +0000" (not RFC 3339).
 * 
 */
export interface TransferDeleteByAppResult {
  /** Unique identifier of the transfer (UUID). */
  uuid: string
  /** Sequential transfer number within the app. */
  num: number
  from_name?: string | null
  from_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Source URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  from_url?: string | null
  to_name?: string | null
  to_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Destination URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  to_url?: string | null
  /** Freeform options passed through to transfer workers. */
  options?: Record<string, unknown>
  source_bytes?: number | null
  processed_bytes: number | null
  /** null while in-progress; true on success; false on failure. */
  succeeded?: boolean | null
  warnings: number
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  created_at: string
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  started_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  canceled_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  updated_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  finished_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  deleted_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  purged_at?: string | null
  /** Retention count. */
  num_keep: number
  /** Present only for scheduled transfers. */
  schedule?: {
    /** UUID of the schedule. */
    uuid?: string
  } | null
  /** Present when the request includes ?verbose=true. */
  logs?: Array<{
    /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
    created_at: string
    level: 'info' | 'warning' | 'error'
    message: string
  }>
}

export interface TransferCancelResult {
  /**
   * Timestamp when cancellation was recorded.
   * Space-separated UTC like "2024-05-28 11:19:37 +0000".
   * 
   */
  canceled_at: string
}

/** Optional request body for the public-url action. */
export interface TransferPublicUrlOpts {
  /** Seconds until the generated URL expires. Defaults to 3600. */
  ttl?: number
}

export interface TransferPublicUrlResult {
  /** Presigned download URL. */
  url: string
  /**
   * When the presigned URL expires.
   * Space-separated UTC like "2026-06-17 15:18:27 +0000".
   * 
   */
  expires_at: string
}

/** Request body for creating a transfer. */
export interface TransferCreateOpts {
  from_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /** Source URL for the transfer. */
  from_url: string
  from_name?: string | null
  to_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Destination URL. Use "auto" when to_type=gof3r to have the
   * server generate a destination.
   * 
   */
  to_url: string
  to_name?: string | null
  /** Freeform options passed through to transfer workers. */
  options?: Record<string, unknown>
  /** Override for retention count. */
  num_keep?: number
  /** Optional logplex drain URL for transfer worker logs. */
  log_input_url?: string
}

/**
 * A data transfer (database backup, copy, or restore).
 * Datetime fields are returned as space-separated UTC strings like
 * "2024-05-28 11:19:37 +0000" (not RFC 3339).
 * 
 */
export interface TransferCreateResult {
  /** Unique identifier of the transfer (UUID). */
  uuid: string
  /** Sequential transfer number within the app. */
  num: number
  from_name?: string | null
  from_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Source URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  from_url?: string | null
  to_name?: string | null
  to_type: 'pg_dump' | 'pg_restore' | 'gof3r' | 'htcat'
  /**
   * Destination URL for the transfer. Credentials are stripped for
   * pg_dump/pg_restore types; for gof3r/htcat the URL is returned
   * as stored.
   * 
   */
  to_url?: string | null
  /** Freeform options passed through to transfer workers. */
  options?: Record<string, unknown>
  source_bytes?: number | null
  processed_bytes: number | null
  /** null while in-progress; true on success; false on failure. */
  succeeded?: boolean | null
  warnings: number
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  created_at: string
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  started_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  canceled_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  updated_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  finished_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  deleted_at?: string | null
  /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
  purged_at?: string | null
  /** Retention count. */
  num_keep: number
  /** Present only for scheduled transfers. */
  schedule?: {
    /** UUID of the schedule. */
    uuid?: string
  } | null
  /** Present when the request includes ?verbose=true. */
  logs?: Array<{
    /** Space-separated UTC timestamp like "2024-05-28 11:19:37 +0000". */
    created_at: string
    level: 'info' | 'warning' | 'error'
    message: string
  }>
}

/** List of configured backup schedules. Schema is intentionally open. */
export type TransferScheduleListResult = Record<string, unknown>

export interface TransferScheduleCreateOpts {
  /** Hour of the day (0-23) at which scheduled backups should run. */
  hour?: number
  /** IANA timezone name for the schedule, e.g. "UTC" or "America/Los_Angeles". */
  timezone?: string
  /** Override for the schedule's name. Defaults to the addon's attachment name. */
  schedule_name?: string
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
  reset(name: string, requestBody: DatabaseResetOpts): Promise<DatabaseResetResult>
  unfollow(name: string): Promise<DatabaseUnfollowResult>
  cancelUpgrade(name: string): Promise<DatabaseCancelUpgradeResult>
  dryRunUpgrade(name: string, requestBody: DatabaseDryRunUpgradeOpts): Promise<DatabaseDryRunUpgradeResult>
  prepareUpgrade(name: string, requestBody: DatabasePrepareUpgradeOpts): Promise<DatabasePrepareUpgradeResult>
  runUpgrade(name: string, requestBody: DatabaseRunUpgradeOpts): Promise<DatabaseRunUpgradeResult>
  upgradeWaitStatus(name: string): Promise<DatabaseUpgradeWaitStatusResult>
  waitStatus(name: string): Promise<DatabaseWaitStatusResult>
  expensiveQueries(name: string, query: {
  limit?: number
}): Promise<DatabaseExpensiveQueriesResult>
  }
  link: {
  list(name: string): Promise<LinkListResult>
  create(name: string, requestBody: LinkCreateOpts): Promise<LinkCreateResult>
  delete(name: string, link_id: string): Promise<LinkDeleteResult>
  info(name: string, link_id: string): Promise<LinkInfoResult>
  }
  maintenance: {
  info(addon_id: string): Promise<MaintenanceInfoResult>
  infoByApp(app_id: string): Promise<MaintenanceInfoByAppResult>
  history(addon_id: string, query: {
  limit?: number
}): Promise<MaintenanceHistoryResult>
  run(addon_id: string): Promise<MaintenanceRunResult>
  schedule(addon_id: string, requestBody: MaintenanceScheduleOpts): Promise<MaintenanceScheduleResult>
  window(addon_id: string): Promise<MaintenanceWindowResult>
  updateWindow(addon_id: string, requestBody: MaintenanceUpdateWindowOpts): Promise<MaintenanceUpdateWindowResult>
  }
  metrics: {
  info(name: string): Promise<MetricsInfoResult>
  }
  objectStore: {
  info(uuid: string): Promise<void>
  rotateCredential(uuid: string): Promise<void>
  }
  postgres: {
  info(addon_id: string): Promise<PostgresInfoResult>
  waitStatus(addon_id: string): Promise<PostgresWaitStatusResult>
  rotateCredentials(addon_id: string, requestBody: PostgresRotateCredentialsOpts): Promise<PostgresRotateCredentialsResult>
  runUpgrade(addon_id: string, requestBody: PostgresRunUpgradeOpts): Promise<PostgresRunUpgradeResult>
  reset(addon_id: string, requestBody: PostgresResetOpts): Promise<void>
  diagnose(addon_id: string): Promise<PostgresDiagnoseResult>
  expensiveQueries(addon_id: string): Promise<PostgresExpensiveQueriesResult>
  }
  postgresCredential: {
  list(addon_id: string): Promise<PostgresCredentialListResult>
  create(addon_id: string, requestBody: PostgresCredentialCreateOpts): Promise<PostgresCredentialCreateResult>
  delete(addon_id: string, cred_name: string): Promise<void>
  info(addon_id: string, cred_name: string): Promise<PostgresCredentialInfoResult>
  rotate(addon_id: string, cred_name: string, requestBody: PostgresCredentialRotateOpts): Promise<void>
  }
  postgresDatabase: {
  config(name: string): Promise<PostgresDatabaseConfigResult>
  updateConfig(name: string, requestBody: PostgresDatabaseUpdateConfigOpts): Promise<PostgresDatabaseUpdateConfigResult>
  listCredentials(name: string): Promise<PostgresDatabaseListCredentialsResult>
  createCredentials(name: string, requestBody: PostgresDatabaseCreateCredentialsOpts): Promise<PostgresDatabaseCreateCredentialsResult>
  rotateCredentials(name: string, query: {
  forced?: boolean
}): Promise<PostgresDatabaseRotateCredentialsResult>
  deleteCredential(name: string, cred_name: string): Promise<PostgresDatabaseDeleteCredentialResult>
  infoCredential(name: string, cred_name: string): Promise<PostgresDatabaseInfoCredentialResult>
  rotateCredential(name: string, cred_name: string, query: {
  forced?: boolean
}): Promise<PostgresDatabaseRotateCredentialResult>
  repairDefault(name: string): Promise<PostgresDatabaseRepairDefaultResult>
  }
  postgresLevel: {
  info(tier: string): Promise<PostgresLevelInfoResult>
  }
  postgresLogicalReplication: {
  enablePublishing(addon_id: string): Promise<PostgresLogicalReplicationEnablePublishingResult>
  enableSubscribing(addon_id: string): Promise<PostgresLogicalReplicationEnableSubscribingResult>
  list(addon_id: string): Promise<PostgresLogicalReplicationListResult>
  create(addon_id: string, requestBody: PostgresLogicalReplicationCreateOpts): Promise<void>
  info(addon_id: string, name: string): Promise<PostgresLogicalReplicationInfoResult>
  update(addon_id: string, name: string, requestBody: PostgresLogicalReplicationUpdateOpts): Promise<void>
  delete(addon_id: string, name: string): Promise<void>
  }
  postgresMigration: {
  create(addon_id: string, requestBody: PostgresMigrationCreateOpts): Promise<PostgresMigrationCreateResult>
  info(addon_id: string): Promise<PostgresMigrationInfoResult>
  run(addon_id: string): Promise<void>
  cancel(addon_id: string): Promise<void>
  }
  postgresPool: {
  create(addon_id: string, requestBody: PostgresPoolCreateOpts): Promise<PostgresPoolCreateResult>
  delete(addon_id: string, pool_id: string): Promise<void>
  info(addon_id: string, pool_id: string): Promise<PostgresPoolInfoResult>
  update(addon_id: string, pool_id: string, requestBody: PostgresPoolUpdateOpts): Promise<PostgresPoolUpdateResult>
  }
  postgresProvisioning: {
  create(requestBody: PostgresProvisioningCreateOpts): Promise<void>
  update(id: string, requestBody: PostgresProvisioningUpdateOpts): Promise<void>
  delete(id: string): Promise<void>
  attach(id: string, requestBody: PostgresProvisioningAttachOpts): Promise<PostgresProvisioningAttachResult>
  }
  postgresQuota: {
  list(addon_id: string): Promise<PostgresQuotaListResult>
  info(addon_id: string, quota_type: string): Promise<PostgresQuotaInfoResult>
  update(addon_id: string, quota_type: string, requestBody: PostgresQuotaUpdateOpts): Promise<PostgresQuotaUpdateResult>
  }
  postgresSettings: {
  info(addon_id: string): Promise<PostgresSettingsInfoResult>
  update(addon_id: string, requestBody: PostgresSettingsUpdateOpts): Promise<PostgresSettingsUpdateResult>
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
  create(name: string, requestBody: RestoreCreateOpts): Promise<RestoreCreateResult>
  }
  transfer: {
  listByApp(name: string): Promise<TransferListByAppResult>
  infoByApp(name: string, xfer_id: string, query: {
  verbose?: boolean
}): Promise<TransferInfoByAppResult>
  deleteByApp(name: string, xfer_id: string): Promise<TransferDeleteByAppResult>
  cancel(name: string, xfer_id: string): Promise<TransferCancelResult>
  publicUrl(name: string, xfer_id: string, requestBody: TransferPublicUrlOpts): Promise<TransferPublicUrlResult>
  create(name: string, requestBody: TransferCreateOpts): Promise<TransferCreateResult>
  }
  transferSchedule: {
  list(name: string): Promise<TransferScheduleListResult>
  create(name: string, requestBody: TransferScheduleCreateOpts): Promise<TransferScheduleCreateResult>
  delete(name: string, schedule_id: string): Promise<TransferScheduleDeleteResult>
  }
}
