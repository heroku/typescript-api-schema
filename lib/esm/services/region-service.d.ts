import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Region](https://devcenter.heroku.com/articles/platform-api-reference#region)
 * A region represents a geographic location in which your application may run.
 */
export default class RegionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing region.
     *
     * @param regionIdentity unique identifier of region or unique name of region.
     * @param requestInit The initializer for the request.
     */
    info(regionIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Region>;
    /**
     * List existing regions.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Region[]>;
}
