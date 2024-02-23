/**
 Heroku Platform API - Team Invitation
A team invitation represents an invite to a team.

*/
export default class TeamInvitationService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Get a list of a team's Identity Providers
 *
 * @param teamName unique name of team.
 */
    async list(teamName) {
        const response = await this.heroku.get(`/teams/${teamName}/invitations`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create Team Invitation
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    async create(teamIdentity, body) {
        const response = await this.heroku.put(`/teams/${teamIdentity}/invitations`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Revoke a team invitation.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamInvitationIdentity unique identifier of an invitation.
     */
    async revoke(teamIdentity, teamInvitationIdentity) {
        const response = await this.heroku.delete(`/teams/${teamIdentity}/invitations/${teamInvitationIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Get an invitation by its token
     *
     * @param teamInvitationToken special token for invitation.
     */
    async get(teamInvitationToken) {
        const response = await this.heroku.get(`/teams/invitations/${teamInvitationToken}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Accept Team Invitation
     *
     * @param teamInvitationToken special token for invitation.
     */
    async accept(teamInvitationToken) {
        const response = await this.heroku.post(`/teams/invitations/${teamInvitationToken}/accept`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
