/**
 Heroku Platform API - Config Vars
Config Vars allow you to manage the configuration information provided to an app on Heroku.

*/
export default class ConfigVarService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Get config-vars for app.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 */
    async infoForApp(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/config-vars`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Get config-vars for a release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param releaseIdentity unique identifier of release or unique version assigned to the release.
     */
    async infoForAppRelease(appIdentity, releaseIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/releases/${releaseIdentity}/config-vars`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update config-vars for app. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/config-vars`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
