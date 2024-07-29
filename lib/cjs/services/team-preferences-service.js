"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Team Preferences](https://devcenter.heroku.com/articles/platform-api-reference#team-preferences)
 * Tracks a Team's Preferences
 */
class TeamPreferencesService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Retrieve Team Preferences
     *
     * @param teamPreferencesIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async list(teamPreferencesIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamPreferencesIdentity}/preferences`, {
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
     * Update Team Preferences
     *
     * @param teamPreferencesIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(teamPreferencesIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamPreferencesIdentity}/preferences`, {
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
exports.default = TeamPreferencesService;