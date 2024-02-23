import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Preferences](https://devcenter.heroku.com/articles/platform-api-reference#team-preferences)
 * Tracks a Team's Preferences
 */
export default class TeamPreferencesService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Retrieve Team Preferences
     *
     * @param teamPreferencesIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamPreferencesIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamPreferences>;
    /**
     * Update Team Preferences
     *
     * @param teamPreferencesIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(teamPreferencesIdentity: string, payload: Heroku.TeamPreferencesUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamPreferences>;
}
