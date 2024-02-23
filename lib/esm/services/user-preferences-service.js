/**
 * [Heroku Platform API - User Preferences](https://devcenter.heroku.com/articles/platform-api-reference#user-preferences)
 * Tracks a user's preferences and message dismissals
 */
export default class UserPreferencesService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Retrieve User Preferences
     *
     * @param userPreferencesIdentity Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    async list(userPreferencesIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${userPreferencesIdentity}/preferences`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Update User Preferences
     *
     * @param userPreferencesIdentity Implicit reference to currently authorized user.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(userPreferencesIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/${userPreferencesIdentity}/preferences`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
