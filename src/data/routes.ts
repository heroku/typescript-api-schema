import type { RouteDefinition } from '../gen/schema-types.js'

export const transfer = {
  listByApp: {
    method: 'GET',
    path: '/client/v11/apps/{name}/transfers',
  },
  infoByApp: {
    method: 'GET',
    path: '/client/v11/apps/{name}/transfers/{xfer_id}',
    query: ['verbose'],
  },
  deleteByApp: {
    method: 'DELETE',
    path: '/client/v11/apps/{name}/transfers/{xfer_id}',
  },
  cancel: {
    method: 'POST',
    path: '/client/v11/apps/{name}/transfers/{xfer_id}/actions/cancel',
  },
  publicUrl: {
    method: 'POST',
    path: '/client/v11/apps/{name}/transfers/{xfer_id}/actions/public-url',
    hasRequestBody: true,
  },
  create: {
    method: 'POST',
    path: '/client/v11/databases/{name}/transfers',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const database = {
  info: { method: 'GET', path: '/client/v11/databases/{name}' },
  connectionReset: { method: 'POST', path: '/client/v11/databases/{name}/connection_reset' },
  reset: {
    method: 'PUT',
    path: '/client/v11/databases/{name}/reset',
    hasRequestBody: true,
  },
  unfollow: { method: 'PUT', path: '/client/v11/databases/{name}/unfollow' },
  cancelUpgrade: { method: 'POST', path: '/client/v11/databases/{name}/upgrade/cancel' },
  dryRunUpgrade: {
    method: 'POST',
    path: '/client/v11/databases/{name}/upgrade/dry_run',
    hasRequestBody: true,
  },
  prepareUpgrade: {
    method: 'POST',
    path: '/client/v11/databases/{name}/upgrade/prepare',
    hasRequestBody: true,
  },
  runUpgrade: {
    method: 'POST',
    path: '/client/v11/databases/{name}/upgrade/run',
    hasRequestBody: true,
  },
  upgradeWaitStatus: { method: 'GET', path: '/client/v11/databases/{name}/upgrade/wait_status' },
  waitStatus: { method: 'GET', path: '/client/v11/databases/{name}/wait_status' },
  expensiveQueries: {
    method: 'GET',
    path: '/client/v11/database/{name}/expensive-queries',
    query: ['limit'],
  },
} as const satisfies Record<string, RouteDefinition>

export const backup = {
  create: { method: 'POST', path: '/client/v11/databases/{name}/backups' },
} as const satisfies Record<string, RouteDefinition>

export const burstStatus = {
  info: { method: 'GET', path: '/client/v11/databases/{name}/burst_status' },
} as const satisfies Record<string, RouteDefinition>

export const connectionPooling = {
  info: { method: 'GET', path: '/client/v11/databases/{name}/connection-pooling' },
  create: {
    method: 'POST',
    path: '/client/v11/databases/{name}/connection-pooling',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const link = {
  list: { method: 'GET', path: '/client/v11/databases/{name}/links' },
  create: {
    method: 'POST',
    path: '/client/v11/databases/{name}/links',
    hasRequestBody: true,
  },
  delete: { method: 'DELETE', path: '/client/v11/databases/{name}/links/{link_id}' },
  info: { method: 'GET', path: '/client/v11/databases/{name}/links/{link_id}' },
} as const satisfies Record<string, RouteDefinition>

export const metrics = {
  info: { method: 'GET', path: '/client/v11/databases/{name}/metrics' },
} as const satisfies Record<string, RouteDefinition>

export const restore = {
  create: {
    method: 'POST',
    path: '/client/v11/databases/{name}/restores',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const transferSchedule = {
  list: { method: 'GET', path: '/client/v11/databases/{name}/transfer-schedules' },
  create: {
    method: 'POST',
    path: '/client/v11/databases/{name}/transfer-schedules',
    hasRequestBody: true,
  },
  delete: {
    method: 'DELETE',
    path: '/client/v11/databases/{name}/transfer-schedules/{schedule_id}',
  },
} as const satisfies Record<string, RouteDefinition>

export const maintenance = {
  info: { method: 'GET', path: '/data/maintenances/v1/{addon_id}' },
  infoByApp: { method: 'GET', path: '/data/maintenances/v1/apps/{app_id}' },
  history: {
    method: 'GET',
    path: '/data/maintenances/v1/{addon_id}/history',
    query: ['limit'],
  },
  run: {
    method: 'POST',
    path: '/data/maintenances/v1/{addon_id}/run',
  },
  schedule: {
    method: 'POST',
    path: '/data/maintenances/v1/{addon_id}/schedule',
    hasRequestBody: true,
  },
  window: { method: 'GET', path: '/data/maintenances/v1/{addon_id}/window' },
  updateWindow: {
    method: 'POST',
    path: '/data/maintenances/v1/{addon_id}/window',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const postgres = {
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/info' },
  waitStatus: { method: 'GET', path: '/data/postgres/v1/{addon_id}/wait_status' },
  rotateCredentials: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/rotate_credentials',
    hasRequestBody: true,
  },
  runUpgrade: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/upgrade/run',
    hasRequestBody: true,
  },
  reset: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/reset',
    hasRequestBody: true,
  },
  diagnose: { method: 'GET', path: '/data/postgres/v1/{addon_id}/diagnose' },
  expensiveQueries: { method: 'GET', path: '/data/postgres/v1/{addon_id}/expensive-queries' },
} as const satisfies Record<string, RouteDefinition>

export const postgresMigration = {
  create: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/migrations',
    hasRequestBody: true,
  },
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/migrations' },
  run: { method: 'POST', path: '/data/postgres/v1/{addon_id}/migrations/run' },
  cancel: { method: 'POST', path: '/data/postgres/v1/{addon_id}/migrations/cancel' },
} as const satisfies Record<string, RouteDefinition>

export const postgresLogicalReplication = {
  enablePublishing: { method: 'POST', path: '/data/postgres/v1/{addon_id}/logical-replication/publishing/enable' },
  enableSubscribing: { method: 'POST', path: '/data/postgres/v1/{addon_id}/logical-replication/subscribing/enable' },
  list: { method: 'GET', path: '/data/postgres/v1/{addon_id}/logical-replication/publications' },
  create: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/logical-replication/publications',
    hasRequestBody: true,
  },
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/logical-replication/publications/{name}' },
  update: {
    method: 'PUT',
    path: '/data/postgres/v1/{addon_id}/logical-replication/publications/{name}',
    hasRequestBody: true,
  },
  delete: { method: 'DELETE', path: '/data/postgres/v1/{addon_id}/logical-replication/publications/{name}' },
} as const satisfies Record<string, RouteDefinition>

export const objectStore = {
  info: { method: 'GET', path: '/object-stores/{uuid}' },
  rotateCredential: { method: 'POST', path: '/object-stores/{uuid}/credential/rotate' },
} as const satisfies Record<string, RouteDefinition>

export const postgresProvisioning = {
  create: {
    method: 'POST',
    path: '/addons/heroku-postgresql/heroku/resources',
    hasRequestBody: true,
  },
  update: {
    method: 'PUT',
    path: '/addons/heroku-postgresql/heroku/resources/{id}',
    hasRequestBody: true,
  },
  delete: { method: 'DELETE', path: '/addons/heroku-postgresql/heroku/resources/{id}' },
  attach: {
    method: 'POST',
    path: '/addons/heroku-postgresql/heroku/resources/{id}/namespaces',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const postgresCredential = {
  list: { method: 'GET', path: '/data/postgres/v1/{addon_id}/credentials' },
  create: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/credentials',
    hasRequestBody: true,
  },
  delete: { method: 'DELETE', path: '/data/postgres/v1/{addon_id}/credentials/{cred_name}' },
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/credentials/{cred_name}' },
  rotate: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/credentials/{cred_name}/rotate',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const postgresPool = {
  create: {
    method: 'POST',
    path: '/data/postgres/v1/{addon_id}/pools',
    hasRequestBody: true,
  },
  delete: { method: 'DELETE', path: '/data/postgres/v1/{addon_id}/pools/{pool_id}' },
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/pools/{pool_id}' },
  update: {
    method: 'PATCH',
    path: '/data/postgres/v1/{addon_id}/pools/{pool_id}',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const postgresQuota = {
  list: { method: 'GET', path: '/data/postgres/v1/{addon_id}/quotas' },
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/quotas/{quota_type}' },
  update: {
    method: 'PATCH',
    path: '/data/postgres/v1/{addon_id}/quotas/{quota_type}',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const postgresSettings = {
  info: { method: 'GET', path: '/data/postgres/v1/{addon_id}/settings' },
  update: {
    method: 'PUT',
    path: '/data/postgres/v1/{addon_id}/settings',
    hasRequestBody: true,
  },
} as const satisfies Record<string, RouteDefinition>

export const postgresLevel = {
  info: { method: 'GET', path: '/data/postgres/v1/levels/{tier}' },
} as const satisfies Record<string, RouteDefinition>

export const postgresDatabase = {
  config: { method: 'GET', path: '/postgres/v0/databases/{name}/config' },
  updateConfig: {
    method: 'PATCH',
    path: '/postgres/v0/databases/{name}/config',
    hasRequestBody: true,
  },
  listCredentials: { method: 'GET', path: '/postgres/v0/databases/{name}/credentials' },
  createCredentials: {
    method: 'POST',
    path: '/postgres/v0/databases/{name}/credentials',
    hasRequestBody: true,
  },
  rotateCredentials: {
    method: 'POST',
    path: '/postgres/v0/databases/{name}/credentials_rotation',
    query: ['forced'],
  },
  deleteCredential: {
    method: 'DELETE',
    path: '/postgres/v0/databases/{name}/credentials/{cred_name}',
  },
  infoCredential: {
    method: 'GET',
    path: '/postgres/v0/databases/{name}/credentials/{cred_name}',
  },
  rotateCredential: {
    method: 'POST',
    path: '/postgres/v0/databases/{name}/credentials/{cred_name}/credentials_rotation',
    query: ['forced'],
  },
  repairDefault: { method: 'POST', path: '/postgres/v0/databases/{name}/repair-default' },
} as const satisfies Record<string, RouteDefinition>

export const redis = {
  info: { method: 'GET', path: '/redis/v0/databases/{name}' },
  config: { method: 'GET', path: '/redis/v0/databases/{name}/config' },
  updateConfig: {
    method: 'PATCH',
    path: '/redis/v0/databases/{name}/config',
    hasRequestBody: true,
  },
  rotateCredentials: { method: 'POST', path: '/redis/v0/databases/{name}/credentials_rotation' },
  resetStats: { method: 'POST', path: '/redis/v0/databases/{name}/stats/reset' },
  upgrade: {
    method: 'POST',
    path: '/redis/v0/databases/{name}/upgrade',
    hasRequestBody: true,
  },
  wait: { method: 'GET', path: '/redis/v0/databases/{name}/wait' },
} as const satisfies Record<string, RouteDefinition>
