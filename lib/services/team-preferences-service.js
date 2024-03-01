/**
 Heroku Platform API - Team Preferences
Tracks a Team's Preferences

*/
export default class TeamPreferencesService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieve Team Preferences
 *
 * @param teamPreferencesIdentity unique name of team or unique identifier of team.
 */
    async list(teamPreferencesIdentity) {
        const response = await this.heroku.get(`/teams/${teamPreferencesIdentity}/preferences`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update Team Preferences
     *
     * @param teamPreferencesIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    async update(teamPreferencesIdentity, body) {
        const response = await this.heroku.patch(`/teams/${teamPreferencesIdentity}/preferences`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
