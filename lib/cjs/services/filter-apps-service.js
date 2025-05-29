"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Filters](https://devcenter.heroku.com/articles/platform-api-reference#filter-apps)
 * Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects.
 */
class FilterAppsService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Request an apps list filtered by app id.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async apps(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/filters/apps`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = FilterAppsService;
