import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - User Preferences](https://devcenter.heroku.com/articles/platform-api-reference#user-preferences)
* Tracks a user's preferences and message dismissals
*/
export default class UserPreferencesService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Retrieve User Preferences
 *
 * @param userPreferencesIdentity Implicit reference to currently authorized user.
 */
    list(userPreferencesIdentity: string): Promise<Heroku.UserPreferences>;
    /**
     * Update User Preferences
     *
     * @param userPreferencesIdentity Implicit reference to currently authorized user.
     * @param body Object to send to the endpoint.
     */
    update(userPreferencesIdentity: string, body: Heroku.UserPreferencesUpdatePayload): Promise<Heroku.UserPreferences>;
}
