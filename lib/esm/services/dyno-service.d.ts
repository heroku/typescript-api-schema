import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Dyno](https://devcenter.heroku.com/articles/platform-api-reference#dyno)
 * Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
 */
export default class DynoService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.DynoCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Dyno>;
    /**
     * Restart dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     * @param requestInit The initializer for the request.
     */
    restart(appIdentity: string, dynoIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Restart all dynos.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    restartAll(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Stop dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     * @param requestInit The initializer for the request.
     */
    stop(appIdentity: string, dynoIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Info for existing dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, dynoIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Dyno>;
    /**
     * List existing dynos.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Dyno[]>;
}
