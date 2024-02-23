import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - User Preferences](https://devcenter.heroku.com/articles/platform-api-reference#user-preferences)
 * Tracks a user's preferences and message dismissals
 */
export default class UserPreferencesService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Retrieve User Preferences
     *
     * @param userPreferencesIdentity Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    list(userPreferencesIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.UserPreferences>;
    /**
     * Update User Preferences
     *
     * @param userPreferencesIdentity Implicit reference to currently authorized user.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(userPreferencesIdentity: string, payload: Heroku.UserPreferencesUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.UserPreferences>;
}
