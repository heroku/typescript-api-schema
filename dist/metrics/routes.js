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
