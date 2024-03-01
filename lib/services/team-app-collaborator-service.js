/**
 Heroku Platform API - Team App Collaborator
A team collaborator represents an account that has been given access to a team app on Heroku.

*/
export default class TeamAppCollaboratorService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/teams/apps/${appIdentity}/collaborators`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     */
    async delete(teamAppIdentity, teamAppCollaboratorIdentity) {
        const response = await this.heroku.delete(`/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for a collaborator on a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     */
    async info(teamAppIdentity, teamAppCollaboratorIdentity) {
        const response = await this.heroku.get(`/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param body Object to send to the endpoint.
     */
    async update(teamAppIdentity, teamAppCollaboratorIdentity, body) {
        const response = await this.heroku.patch(`/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List collaborators on a team app.
     *
     * @param teamAppIdentity unique name of app.
     */
    async list(teamAppIdentity) {
        const response = await this.heroku.get(`/teams/apps/${teamAppIdentity}/collaborators`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
