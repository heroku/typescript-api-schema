import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Build API - Build](https://devcenter.heroku.com/articles/platform-api-reference#build)
 * A build represents the process of transforming a code tarball into a slug
 */
export default class BuildService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.BuildCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Build>;
    /**
     * Info for existing build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param buildIdentity unique identifier of build.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, buildIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Build>;
    /**
     * List existing build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Build[]>;
    /**
     * Destroy a build cache.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    deleteCache(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
    /**
     * Cancel running build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param buildIdentity unique identifier of build.
     * @param requestInit The initializer for the request.
     */
    cancel(appIdentity: string, buildIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Build>;
}
