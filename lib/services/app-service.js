/**
 Heroku Platform API - App
An app represents the program that you would like to deploy and run on Heroku.

*/
export default class AppService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new app.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/apps`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async delete(appIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async info(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing apps.
     *
     */
    async list() {
        const response = await this.heroku.get(`/apps`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List owned and collaborated apps (excludes team apps).
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    async listOwnedAndCollaborated(accountIdentity) {
        const response = await this.heroku.get(`/users/${accountIdentity}/apps`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Enable ACM flag for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async enableAcm(appIdentity) {
        const response = await this.heroku.post(`/apps/${appIdentity}/acm`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Disable ACM flag for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async disableAcm(appIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/acm`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Refresh ACM for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async refreshAcm(appIdentity) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/acm`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
