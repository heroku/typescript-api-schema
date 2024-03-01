/**
 Heroku Platform API - Team Member
A team member is an individual with access to a team.

*/
export default class TeamMemberService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new team member, or update their role.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 * @param body Object to send to the endpoint.
 */
    async createOrUpdate(teamIdentity, body) {
        const response = await this.heroku.put(`/teams/${teamIdentity}/members`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Create a new team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    async create(teamIdentity, body) {
        const response = await this.heroku.post(`/teams/${teamIdentity}/members`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update a team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    async update(teamIdentity, body) {
        const response = await this.heroku.patch(`/teams/${teamIdentity}/members`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Remove a member from the team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
     */
    async delete(teamIdentity, teamMemberIdentity) {
        const response = await this.heroku.delete(`/teams/${teamIdentity}/members/${teamMemberIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List members of the team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async list(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/members`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List the apps of a team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
     */
    async listByMember(teamIdentity, teamMemberIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/members/${teamMemberIdentity}/apps`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
