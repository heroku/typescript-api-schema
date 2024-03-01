/**
 Heroku Platform API - Team Add-on
undefined

*/
export default class TeamAddOnService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List add-ons used across all Team apps
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    async listForTeam(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/addons`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
