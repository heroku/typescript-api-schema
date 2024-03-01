/**
 Heroku Platform API - Collaborator
A collaborator represents an account that has been given access to an app on Heroku.

*/
export default class CollaboratorService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new collaborator.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/collaborators`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
     */
    async delete(appIdentity, collaboratorIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/collaborators/${collaboratorIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
     */
    async info(appIdentity, collaboratorIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/collaborators/${collaboratorIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing collaborators.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/collaborators`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
