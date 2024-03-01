/**
 Heroku Platform API - Allowed Add-on Service
Entities that have been allowed to be used by a Team

*/
export default class AllowedAddOnServiceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List all allowed add-on services for a team
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    async listByTeam(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/allowed-addon-services`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Allow an Add-on Service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    async createByTeam(teamIdentity, body) {
        const response = await this.heroku.post(`/teams/${teamIdentity}/allowed-addon-services`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Remove an allowed add-on service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param allowedAddOnServiceIdentity unique identifier for this allowed add-on service record or unique name of this add-on-service.
     */
    async deleteByTeam(teamIdentity, allowedAddOnServiceIdentity) {
        const response = await this.heroku.delete(`/teams/${teamIdentity}/allowed-addon-services/${allowedAddOnServiceIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
