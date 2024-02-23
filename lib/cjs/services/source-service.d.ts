import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Source](https://devcenter.heroku.com/articles/platform-api-reference#source)
 * A source is a location for uploading and downloading an application's source code.
 */
export default class SourceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create URLs for uploading and downloading source.
     *
     * @param requestInit The initializer for the request.
     */
    create(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Source>;
    /**
     * Create URLs for uploading and downloading source. Deprecated in favor of `POST /sources`
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    createDeprecated(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Source>;
}
