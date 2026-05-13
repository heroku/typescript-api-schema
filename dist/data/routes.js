export const transfer = {
  "listByApp": {
    "method": "GET",
    "path": "/client/v11/apps/{name}/transfers"
  },
  "infoByApp": {
    "method": "GET",
    "path": "/client/v11/apps/{name}/transfers/{xfer_id}"
  },
  "deleteByApp": {
    "method": "DELETE",
    "path": "/client/v11/apps/{name}/transfers/{xfer_id}"
  },
  "cancel": {
    "method": "POST",
    "path": "/client/v11/apps/{name}/transfers/{xfer_id}/actions/cancel"
  },
  "publicUrl": {
    "method": "POST",
    "path": "/client/v11/apps/{name}/transfers/{xfer_id}/actions/public-url"
  },
  "list": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/transfers"
  },
  "create": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/transfers",
    "hasRequestBody": true
  }
}

export const database = {
  "info": {
    "method": "GET",
    "path": "/client/v11/databases/{name}"
  },
  "connectionReset": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/connection_reset"
  },
  "reset": {
    "method": "PUT",
    "path": "/client/v11/databases/{name}/reset"
  },
  "unfollow": {
    "method": "PUT",
    "path": "/client/v11/databases/{name}/unfollow"
  },
  "cancelUpgrade": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/upgrade/cancel"
  },
  "dryRunUpgrade": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/upgrade/dry_run",
    "hasRequestBody": true
  },
  "prepareUpgrade": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/upgrade/prepare",
    "hasRequestBody": true
  },
  "runUpgrade": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/upgrade/run",
    "hasRequestBody": true
  },
  "upgradeWaitStatus": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/upgrade/wait_status"
  },
  "waitStatus": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/wait_status"
  }
}

export const backup = {
  "create": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/backups",
    "hasRequestBody": true
  }
}

export const burstStatus = {
  "info": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/burst_status"
  }
}

export const connectionPooling = {
  "info": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/connection-pooling"
  },
  "create": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/connection-pooling",
    "hasRequestBody": true
  }
}

export const link = {
  "list": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/links"
  },
  "create": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/links",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/client/v11/databases/{name}/links/{link_id}"
  },
  "info": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/links/{link_id}"
  }
}

export const metrics = {
  "info": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/metrics"
  }
}

export const restore = {
  "create": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/restores",
    "hasRequestBody": true
  }
}

export const transferSchedule = {
  "list": {
    "method": "GET",
    "path": "/client/v11/databases/{name}/transfer-schedules"
  },
  "create": {
    "method": "POST",
    "path": "/client/v11/databases/{name}/transfer-schedules",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/client/v11/databases/{name}/transfer-schedules/{schedule_id}"
  }
}

export const maintenance = {
  "info": {
    "method": "GET",
    "path": "/data/maintenances/v1/{uuid}"
  },
  "infoByApp": {
    "method": "GET",
    "path": "/data/maintenances/v1/apps/{uuid}"
  },
  "history": {
    "method": "GET",
    "path": "/data/maintenances/v1/{uuid}/history"
  },
  "run": {
    "method": "POST",
    "path": "/data/maintenances/v1/{uuid}/run",
    "hasRequestBody": true
  },
  "schedule": {
    "method": "POST",
    "path": "/data/maintenances/v1/{uuid}/schedule",
    "hasRequestBody": true
  },
  "window": {
    "method": "GET",
    "path": "/data/maintenances/v1/{uuid}/window"
  },
  "updateWindow": {
    "method": "POST",
    "path": "/data/maintenances/v1/{uuid}/window",
    "hasRequestBody": true
  }
}

export const postgres = {
  "info": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/info"
  },
  "waitStatus": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/wait_status"
  },
  "rotateCredentials": {
    "method": "POST",
    "path": "/data/postgres/v1/{uuid}/rotate_credentials"
  },
  "runUpgrade": {
    "method": "POST",
    "path": "/data/postgres/v1/{uuid}/upgrade/run",
    "hasRequestBody": true
  }
}

export const postgresCredential = {
  "list": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/credentials"
  },
  "create": {
    "method": "POST",
    "path": "/data/postgres/v1/{uuid}/credentials",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/data/postgres/v1/{uuid}/credentials/{cred_name}"
  },
  "info": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/credentials/{cred_name}"
  },
  "rotate": {
    "method": "POST",
    "path": "/data/postgres/v1/{uuid}/credentials/{cred_name}/rotate"
  }
}

export const postgresPool = {
  "create": {
    "method": "POST",
    "path": "/data/postgres/v1/{uuid}/pools",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/data/postgres/v1/{uuid}/pools/{pool_id}"
  },
  "info": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/pools/{pool_id}"
  },
  "update": {
    "method": "PATCH",
    "path": "/data/postgres/v1/{uuid}/pools/{pool_id}",
    "hasRequestBody": true
  }
}

export const postgresQuota = {
  "list": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/quotas"
  },
  "info": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/quotas/{quota_type}"
  },
  "update": {
    "method": "PATCH",
    "path": "/data/postgres/v1/{uuid}/quotas/{quota_type}",
    "hasRequestBody": true
  }
}

export const postgresSettings = {
  "info": {
    "method": "GET",
    "path": "/data/postgres/v1/{uuid}/settings"
  },
  "update": {
    "method": "PUT",
    "path": "/data/postgres/v1/{uuid}/settings",
    "hasRequestBody": true
  }
}

export const postgresLevel = {
  "info": {
    "method": "GET",
    "path": "/data/postgres/v1/levels/{tier}"
  }
}

export const postgresDatabase = {
  "config": {
    "method": "GET",
    "path": "/postgres/v0/databases/{name}/config"
  },
  "updateConfig": {
    "method": "PATCH",
    "path": "/postgres/v0/databases/{name}/config",
    "hasRequestBody": true
  },
  "listCredentials": {
    "method": "GET",
    "path": "/postgres/v0/databases/{name}/credentials"
  },
  "createCredentials": {
    "method": "POST",
    "path": "/postgres/v0/databases/{name}/credentials",
    "hasRequestBody": true
  },
  "rotateCredentials": {
    "method": "POST",
    "path": "/postgres/v0/databases/{name}/credentials_rotation"
  },
  "deleteCredential": {
    "method": "DELETE",
    "path": "/postgres/v0/databases/{name}/credentials/{cred_name}"
  },
  "infoCredential": {
    "method": "GET",
    "path": "/postgres/v0/databases/{name}/credentials/{cred_name}"
  },
  "rotateCredential": {
    "method": "POST",
    "path": "/postgres/v0/databases/{name}/credentials/{cred_name}/credentials_rotation"
  },
  "repairDefault": {
    "method": "POST",
    "path": "/postgres/v0/databases/{name}/repair-default"
  }
}

export const redis = {
  "info": {
    "method": "GET",
    "path": "/redis/v0/databases/{name}"
  },
  "config": {
    "method": "GET",
    "path": "/redis/v0/databases/{name}/config"
  },
  "updateConfig": {
    "method": "PATCH",
    "path": "/redis/v0/databases/{name}/config",
    "hasRequestBody": true
  },
  "rotateCredentials": {
    "method": "POST",
    "path": "/redis/v0/databases/{name}/credentials_rotation"
  },
  "resetStats": {
    "method": "POST",
    "path": "/redis/v0/databases/{name}/stats/reset"
  },
  "upgrade": {
    "method": "POST",
    "path": "/redis/v0/databases/{name}/upgrade",
    "hasRequestBody": true
  },
  "wait": {
    "method": "GET",
    "path": "/redis/v0/databases/{name}/wait"
  }
}
