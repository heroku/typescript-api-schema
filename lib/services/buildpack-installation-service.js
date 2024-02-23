/**
 Heroku Platform API - Buildpack Installations
A buildpack installation represents a buildpack that will be run against an app.

*/
export default class BuildpackInstallationService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Update an app's buildpack installations.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async update(appIdentity, body) {
        const response = await this.heroku.put(`/apps/${appIdentity}/buildpack-installations`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List an app's existing buildpack installations.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/buildpack-installations`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
