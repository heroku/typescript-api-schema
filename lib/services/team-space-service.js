/**
 Heroku Platform API - Team Space
A space is an isolated, highly available, secure app execution environment.

*/
export default class TeamSpaceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List spaces owned by the team
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    async list(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/spaces`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
