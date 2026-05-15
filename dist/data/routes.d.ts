/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export declare const transfer: {
    readonly listByApp: {
        readonly method: "GET";
        readonly path: "/client/v11/apps/{name}/transfers";
    };
    readonly infoByApp: {
        readonly method: "GET";
        readonly path: "/client/v11/apps/{name}/transfers/{xfer_id}";
    };
    readonly deleteByApp: {
        readonly method: "DELETE";
        readonly path: "/client/v11/apps/{name}/transfers/{xfer_id}";
    };
    readonly cancel: {
        readonly method: "POST";
        readonly path: "/client/v11/apps/{name}/transfers/{xfer_id}/actions/cancel";
    };
    readonly publicUrl: {
        readonly method: "POST";
        readonly path: "/client/v11/apps/{name}/transfers/{xfer_id}/actions/public-url";
    };
    readonly list: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/transfers";
    };
    readonly create: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/transfers";
        readonly hasRequestBody: true;
    };
};
export declare const database: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}";
    };
    readonly connectionReset: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/connection_reset";
    };
    readonly reset: {
        readonly method: "PUT";
        readonly path: "/client/v11/databases/{name}/reset";
    };
    readonly unfollow: {
        readonly method: "PUT";
        readonly path: "/client/v11/databases/{name}/unfollow";
    };
    readonly cancelUpgrade: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/upgrade/cancel";
    };
    readonly dryRunUpgrade: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/upgrade/dry_run";
        readonly hasRequestBody: true;
    };
    readonly prepareUpgrade: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/upgrade/prepare";
        readonly hasRequestBody: true;
    };
    readonly runUpgrade: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/upgrade/run";
        readonly hasRequestBody: true;
    };
    readonly upgradeWaitStatus: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/upgrade/wait_status";
    };
    readonly waitStatus: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/wait_status";
    };
};
export declare const backup: {
    readonly create: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/backups";
        readonly hasRequestBody: true;
    };
};
export declare const burstStatus: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/burst_status";
    };
};
export declare const connectionPooling: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/connection-pooling";
    };
    readonly create: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/connection-pooling";
        readonly hasRequestBody: true;
    };
};
export declare const link: {
    readonly list: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/links";
    };
    readonly create: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/links";
        readonly hasRequestBody: true;
    };
    readonly delete: {
        readonly method: "DELETE";
        readonly path: "/client/v11/databases/{name}/links/{link_id}";
    };
    readonly info: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/links/{link_id}";
    };
};
export declare const metrics: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/metrics";
    };
};
export declare const restore: {
    readonly create: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/restores";
        readonly hasRequestBody: true;
    };
};
export declare const transferSchedule: {
    readonly list: {
        readonly method: "GET";
        readonly path: "/client/v11/databases/{name}/transfer-schedules";
    };
    readonly create: {
        readonly method: "POST";
        readonly path: "/client/v11/databases/{name}/transfer-schedules";
        readonly hasRequestBody: true;
    };
    readonly delete: {
        readonly method: "DELETE";
        readonly path: "/client/v11/databases/{name}/transfer-schedules/{schedule_id}";
    };
};
export declare const maintenance: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/maintenances/v1/{uuid}";
    };
    readonly infoByApp: {
        readonly method: "GET";
        readonly path: "/data/maintenances/v1/apps/{uuid}";
    };
    readonly history: {
        readonly method: "GET";
        readonly path: "/data/maintenances/v1/{uuid}/history";
    };
    readonly run: {
        readonly method: "POST";
        readonly path: "/data/maintenances/v1/{uuid}/run";
        readonly hasRequestBody: true;
    };
    readonly schedule: {
        readonly method: "POST";
        readonly path: "/data/maintenances/v1/{uuid}/schedule";
        readonly hasRequestBody: true;
    };
    readonly window: {
        readonly method: "GET";
        readonly path: "/data/maintenances/v1/{uuid}/window";
    };
    readonly updateWindow: {
        readonly method: "POST";
        readonly path: "/data/maintenances/v1/{uuid}/window";
        readonly hasRequestBody: true;
    };
};
export declare const postgres: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/info";
    };
    readonly waitStatus: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/wait_status";
    };
    readonly rotateCredentials: {
        readonly method: "POST";
        readonly path: "/data/postgres/v1/{uuid}/rotate_credentials";
    };
    readonly runUpgrade: {
        readonly method: "POST";
        readonly path: "/data/postgres/v1/{uuid}/upgrade/run";
        readonly hasRequestBody: true;
    };
};
export declare const postgresCredential: {
    readonly list: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/credentials";
    };
    readonly create: {
        readonly method: "POST";
        readonly path: "/data/postgres/v1/{uuid}/credentials";
        readonly hasRequestBody: true;
    };
    readonly delete: {
        readonly method: "DELETE";
        readonly path: "/data/postgres/v1/{uuid}/credentials/{cred_name}";
    };
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/credentials/{cred_name}";
    };
    readonly rotate: {
        readonly method: "POST";
        readonly path: "/data/postgres/v1/{uuid}/credentials/{cred_name}/rotate";
    };
};
export declare const postgresPool: {
    readonly create: {
        readonly method: "POST";
        readonly path: "/data/postgres/v1/{uuid}/pools";
        readonly hasRequestBody: true;
    };
    readonly delete: {
        readonly method: "DELETE";
        readonly path: "/data/postgres/v1/{uuid}/pools/{pool_id}";
    };
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/pools/{pool_id}";
    };
    readonly update: {
        readonly method: "PATCH";
        readonly path: "/data/postgres/v1/{uuid}/pools/{pool_id}";
        readonly hasRequestBody: true;
    };
};
export declare const postgresQuota: {
    readonly list: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/quotas";
    };
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/quotas/{quota_type}";
    };
    readonly update: {
        readonly method: "PATCH";
        readonly path: "/data/postgres/v1/{uuid}/quotas/{quota_type}";
        readonly hasRequestBody: true;
    };
};
export declare const postgresSettings: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/{uuid}/settings";
    };
    readonly update: {
        readonly method: "PUT";
        readonly path: "/data/postgres/v1/{uuid}/settings";
        readonly hasRequestBody: true;
    };
};
export declare const postgresLevel: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/data/postgres/v1/levels/{tier}";
    };
};
export declare const postgresDatabase: {
    readonly config: {
        readonly method: "GET";
        readonly path: "/postgres/v0/databases/{name}/config";
    };
    readonly updateConfig: {
        readonly method: "PATCH";
        readonly path: "/postgres/v0/databases/{name}/config";
        readonly hasRequestBody: true;
    };
    readonly listCredentials: {
        readonly method: "GET";
        readonly path: "/postgres/v0/databases/{name}/credentials";
    };
    readonly createCredentials: {
        readonly method: "POST";
        readonly path: "/postgres/v0/databases/{name}/credentials";
        readonly hasRequestBody: true;
    };
    readonly rotateCredentials: {
        readonly method: "POST";
        readonly path: "/postgres/v0/databases/{name}/credentials_rotation";
    };
    readonly deleteCredential: {
        readonly method: "DELETE";
        readonly path: "/postgres/v0/databases/{name}/credentials/{cred_name}";
    };
    readonly infoCredential: {
        readonly method: "GET";
        readonly path: "/postgres/v0/databases/{name}/credentials/{cred_name}";
    };
    readonly rotateCredential: {
        readonly method: "POST";
        readonly path: "/postgres/v0/databases/{name}/credentials/{cred_name}/credentials_rotation";
    };
    readonly repairDefault: {
        readonly method: "POST";
        readonly path: "/postgres/v0/databases/{name}/repair-default";
    };
};
export declare const redis: {
    readonly info: {
        readonly method: "GET";
        readonly path: "/redis/v0/databases/{name}";
    };
    readonly config: {
        readonly method: "GET";
        readonly path: "/redis/v0/databases/{name}/config";
    };
    readonly updateConfig: {
        readonly method: "PATCH";
        readonly path: "/redis/v0/databases/{name}/config";
        readonly hasRequestBody: true;
    };
    readonly rotateCredentials: {
        readonly method: "POST";
        readonly path: "/redis/v0/databases/{name}/credentials_rotation";
    };
    readonly resetStats: {
        readonly method: "POST";
        readonly path: "/redis/v0/databases/{name}/stats/reset";
    };
    readonly upgrade: {
        readonly method: "POST";
        readonly path: "/redis/v0/databases/{name}/upgrade";
        readonly hasRequestBody: true;
    };
    readonly wait: {
        readonly method: "GET";
        readonly path: "/redis/v0/databases/{name}/wait";
    };
};
