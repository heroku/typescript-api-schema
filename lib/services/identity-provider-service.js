/**
 Heroku Platform API - Identity Provider
Identity Providers represent the SAML configuration of an Enterprise Account or Team.

*/
export default class IdentityProviderService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Get a list of a team's Identity Providers
 *
 * @param teamName unique name of team.
 */
    async listByTeam(teamName) {
        const response = await this.heroku.get(`/teams/${teamName}/identity-providers`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create an Identity Provider for a team
     *
     * @param teamName unique name of team.
     * @param body Object to send to the endpoint.
     */
    async createByTeam(teamName, body) {
        const response = await this.heroku.post(`/teams/${teamName}/identity-providers`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update a team's Identity Provider
     *
     * @param teamName unique name of team.
     * @param identityProviderId unique identifier of this identity provider.
     * @param body Object to send to the endpoint.
     */
    async updateByTeam(teamName, identityProviderId, body) {
        const response = await this.heroku.patch(`/teams/${teamName}/identity-providers/${identityProviderId}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete a team's Identity Provider
     *
     * @param teamName unique name of team.
     * @param identityProviderId unique identifier of this identity provider.
     */
    async deleteByTeam(teamName, identityProviderId) {
        const response = await this.heroku.delete(`/teams/${teamName}/identity-providers/${identityProviderId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
