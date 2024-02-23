import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Preferences](https://devcenter.heroku.com/articles/platform-api-reference#team-preferences)
 * Tracks a Team's Preferences
 */
export default class TeamPreferencesService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Retrieve Team Preferences
   *
   * @param teamPreferencesIdentity unique name of team or unique identifier of team.
   */
  public async list(teamPreferencesIdentity: string): Promise<Heroku.TeamPreferences> {
    const response = await this.heroku.get<Heroku.TeamPreferences>(`/teams/${teamPreferencesIdentity}/preferences`, {
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
  public async update(
    teamPreferencesIdentity: string,
    body: Heroku.TeamPreferencesUpdatePayload
  ): Promise<Heroku.TeamPreferences> {
    const response = await this.heroku.patch<Heroku.TeamPreferences>(`/teams/${teamPreferencesIdentity}/preferences`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
