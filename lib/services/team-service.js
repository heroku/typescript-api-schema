/**
 Heroku Platform API - Team
Teams allow you to manage access to a shared group of applications and other resources.

*/
export default class TeamService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List teams in which you are a member.
 *
 */
    async list() {
        const response = await this.heroku.get(`/teams`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async info(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update team properties.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    async update(teamIdentity, body) {
        const response = await this.heroku.patch(`/teams/${teamIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Create a new team.
     *
     * @param body Object to send to the endpoint.
     */
    async create(body) {
        const response = await this.heroku.post(`/teams`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async delete(teamIdentity) {
        const response = await this.heroku.delete(`/teams/${teamIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List teams for an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     */
    async listByEnterpriseAccount(enterpriseAccountIdentity) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountIdentity}/teams`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a team in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param body Object to send to the endpoint.
     */
    async createInEnterpriseAccount(enterpriseAccountIdentity, body) {
        const response = await this.heroku.post(`/enterprise-accounts/${enterpriseAccountIdentity}/teams`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
