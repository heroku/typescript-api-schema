import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Filters](https://devcenter.heroku.com/articles/platform-api-reference#filter-apps)
 * Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects.
 */
export default class FilterAppsService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Request an apps list filtered by app id.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    apps(payload: Heroku.Filter, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp[]>;
}
