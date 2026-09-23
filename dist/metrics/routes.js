/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

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
};
export const formationMetric = {
    errors: {
        method: 'GET',
        path: '/apps/{app}/formation/{formationType}/metrics/errors',
        query: ['start_time', 'end_time', 'step'],
    },
};
// Autoscaling monitor CRUD on api.metrics.heroku.com. metaas is not checked out
// in this workspace, so paths and the monitor body/response shape are grounded on
// the only live callers: cli/src/commands/ps/autoscale/{enable,disable}.ts. Those
// GET the monitor list, POST a new `scale` monitor, and PATCH an existing one by id
// (all against METRICS_HOST, no Accept-version header). If metaas diverges, update
// this file and metrics/schemas.json by hand.
export const formationMonitor = {
    list: {
        method: 'GET',
        path: '/apps/{app}/formation/{formationType}/monitors',
    },
    create: {
        method: 'POST',
        path: '/apps/{app}/formation/{formationType}/monitors',
        hasRequestBody: true,
    },
    update: {
        method: 'PATCH',
        path: '/apps/{app}/formation/{formationType}/monitors/{monitorId}',
        hasRequestBody: true,
    },
};
