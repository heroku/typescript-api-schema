/**
 Heroku Platform API - Formation
The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.

*/
export default class FormationService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for a process type
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param formationIdentity unique identifier of this process type or type of process to maintain.
 */
    async info(appIdentity, formationIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/formation/${formationIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List process type formation
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/formation`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Batch update process types
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async batchUpdate(appIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/formation`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update process type
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param formationIdentity unique identifier of this process type or type of process to maintain.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, formationIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/formation/${formationIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
