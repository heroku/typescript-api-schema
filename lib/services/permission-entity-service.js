/**
 Heroku Platform API - Permission Entity
An owned entity including users' permissions.

*/
export default class PermissionEntityService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List permission entities for a team.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    async list(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/permissions`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
