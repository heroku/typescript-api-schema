/**
 Heroku Platform API - Team App
A team app encapsulates the team specific functionality of Heroku apps.

*/
export default class TeamAppService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/teams/apps`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for a team app.
     *
     * @param teamAppIdentity unique name of app.
     */
    async info(teamAppIdentity) {
        const response = await this.heroku.get(`/teams/apps/${teamAppIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Lock or unlock a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param body Object to send to the endpoint.
     */
    async updateLocked(teamAppIdentity, body) {
        const response = await this.heroku.patch(`/teams/apps/${teamAppIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Transfer an existing team app to another Heroku account.
     *
     * @param teamAppIdentity unique name of app.
     * @param body Object to send to the endpoint.
     */
    async transferToAccount(teamAppIdentity, body) {
        const response = await this.heroku.patch(`/teams/apps/${teamAppIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Transfer an existing team app to another team.
     *
     * @param teamAppIdentity unique name of app.
     * @param body Object to send to the endpoint.
     */
    async transferToTeam(teamAppIdentity, body) {
        const response = await this.heroku.patch(`/teams/apps/${teamAppIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List team apps.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async listByTeam(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/apps`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
