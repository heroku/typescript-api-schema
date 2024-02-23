/**
 Heroku Platform API - User Preferences
Tracks a user's preferences and message dismissals

*/
export default class UserPreferencesService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieve User Preferences
 *
 * @param userPreferencesIdentity Implicit reference to currently authorized user.
 */
    async list(userPreferencesIdentity) {
        const response = await this.heroku.get(`/users/${userPreferencesIdentity}/preferences`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update User Preferences
     *
     * @param userPreferencesIdentity Implicit reference to currently authorized user.
     * @param body Object to send to the endpoint.
     */
    async update(userPreferencesIdentity, body) {
        const response = await this.heroku.patch(`/users/${userPreferencesIdentity}/preferences`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
