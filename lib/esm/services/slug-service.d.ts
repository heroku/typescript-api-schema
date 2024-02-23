import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Slug](https://devcenter.heroku.com/articles/platform-api-reference#slug)
 * A slug is a snapshot of your application code that is ready to run on the platform.
 */
export default class SlugService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing slug.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param slugIdentity unique identifier of slug.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, slugIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Slug>;
    /**
     * Create a new slug. For more information please refer to [Deploying Slugs using the Platform API](https://devcenter.heroku.com/articles/platform-api-deploying-slugs).
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.SlugCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Slug>;
}
