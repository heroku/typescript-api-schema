import type { APIClient } from '@heroku-cli/command';
/**
 * [Heroku Platform API - Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#config-var)
* Config Vars allow you to manage the configuration information provided to an app on Heroku.
*/
export default class ConfigVarService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Get config-vars for app.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 */
    infoForApp(appIdentity: string): Promise<Record<string, unknown>>;
    /**
     * Get config-vars for a release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param releaseIdentity unique identifier of release or unique version assigned to the release.
     */
    infoForAppRelease(appIdentity: string, releaseIdentity: string | number): Promise<Record<string, unknown>>;
    /**
     * Update config-vars for app. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, body: Record<string, unknown>): Promise<Record<string, unknown>>;
}
