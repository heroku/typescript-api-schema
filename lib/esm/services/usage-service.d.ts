import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Usage](https://devcenter.heroku.com/articles/platform-api-reference#usage)
 * Usage for apps.
 */
export default class UsageService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Retrieves usage for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Usage>;
    /**
     * Retrieves usage for an app belonging to a particular team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    infoUsage(teamIdentity: string, teamAppIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Usage>;
    /**
     * Retrieves usage for apps belonging to a particular team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    infoApps(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Apps>;
}
