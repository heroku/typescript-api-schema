/**
 * [Heroku Platform API - Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#config-var)
 * Config Vars allow you to manage the configuration information provided to an app on Heroku.
 */
export default class ConfigVarService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Get config-vars for app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    infoForApp(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Get config-vars for a release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param releaseIdentity unique identifier of release or unique version assigned to the release.
     * @param requestInit The initializer for the request.
     */
    infoForAppRelease(appIdentity: string, releaseIdentity: string | number, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Update config-vars for app. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, payload: Record<string, unknown>, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
}
