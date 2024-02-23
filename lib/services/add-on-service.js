/**
 Heroku Platform API - Add-on
Add-ons represent add-ons that have been provisioned and attached to one or more apps.

*/
export default class AddOnService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List all existing add-ons.
 *
 */
    async list() {
        const response = await this.heroku.get(`/addons`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info for an existing add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async info(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a new add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/addons`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async delete(appIdentity, addOnIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for an existing add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async infoByApp(appIdentity, addOnIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing add-ons for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async listByApp(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/addons`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, addOnIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List all existing add-ons a user has access to
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    async listByUser(accountIdentity) {
        const response = await this.heroku.get(`/users/${accountIdentity}/addons`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List add-ons used across all Team apps
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async listByTeam(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/addons`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many.
     *
     * @param body Object to send to the endpoint.
     */
    async resolution(body) {
        const response = await this.heroku.post(`/actions/addons/resolve`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
