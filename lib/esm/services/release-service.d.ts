import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Release](https://devcenter.heroku.com/articles/platform-api-reference#release)
 * A release represents a combination of code, config vars and add-ons for an app on Heroku.
 */
export default class ReleaseService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param releaseIdentity unique identifier of release or unique version assigned to the release.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, releaseIdentity: string | number, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Release>;
    /**
     * List existing releases.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Release[]>;
    /**
     * Create new release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.ReleaseCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Release>;
    /**
     * Rollback to an existing release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    rollback(appIdentity: string, payload: Heroku.ReleaseRollbackPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Release>;
}
