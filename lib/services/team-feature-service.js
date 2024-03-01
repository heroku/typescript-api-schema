/**
 Heroku Platform API - Team Feature
A team feature represents a feature enabled on a team account.

*/
export default class TeamFeatureService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for an existing team feature.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 * @param teamFeatureIdentity unique identifier of team feature or unique name of team feature.
 */
    async info(teamIdentity, teamFeatureIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/features/${teamFeatureIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing team features.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async list(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/features`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
