import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Session](https://devcenter.heroku.com/articles/platform-api-reference#log-session)
 * A log session is a reference to the http based log stream for an app.
 */
export default class LogSessionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new log session.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.LogSessionCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.LogSession>;
}
