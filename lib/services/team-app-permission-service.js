/**
 Heroku Platform API - Team App Permission
A team app permission is a behavior that is assigned to a user in a team app.

*/
export default class TeamAppPermissionService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Lists permissions available to teams.
 *
 */
    async list() {
        const response = await this.heroku.get(`/teams/permissions`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
