import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Config Vars Settings](https://devcenter.heroku.com/articles/platform-api-reference#config-vars-settings)
 * The Config Vars Settings endpoints enable you to view and manage the configuration provided to an app on Heroku. These endpoints are similar to /config-vars but also allow you to check which config vars you can mask, and which are currently masked.
 */
export default class ConfigVarsSettingsService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Get additional info for an app's config vars, including which config vars you can mask, and which are currently masked.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ConfigVarsSettings[]>;
    /**
     * Update a config var. You can update an existing config var's value by setting it again, and you can remove it by setting it to `null`. You can't unmask a masked config var.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, payload: Heroku.ConfigVarsSettingsUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
}
