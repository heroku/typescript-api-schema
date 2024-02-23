import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Preferences](https://devcenter.heroku.com/articles/platform-api-reference#team-preferences)
* Tracks a Team's Preferences
*/
export default class TeamPreferencesService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Retrieve Team Preferences
 *
 * @param teamPreferencesIdentity unique name of team or unique identifier of team.
 */
    list(teamPreferencesIdentity: string): Promise<Heroku.TeamPreferences>;
    /**
     * Update Team Preferences
     *
     * @param teamPreferencesIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    update(teamPreferencesIdentity: string, body: Heroku.TeamPreferencesUpdatePayload): Promise<Heroku.TeamPreferences>;
}
