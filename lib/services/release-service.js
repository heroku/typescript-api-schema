/**
 Heroku Platform API - Release
A release represents a combination of code, config vars and add-ons for an app on Heroku.

*/
export default class ReleaseService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing release.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param releaseIdentity unique identifier of release or unique version assigned to the release.
 */
    async info(appIdentity, releaseIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/releases/${releaseIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing releases.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/releases`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create new release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/releases`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Rollback to an existing release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async rollback(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/releases`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
