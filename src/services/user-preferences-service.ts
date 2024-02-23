import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - User Preferences](https://devcenter.heroku.com/articles/platform-api-reference#user-preferences)
 * Tracks a user's preferences and message dismissals
 */
export default class UserPreferencesService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Retrieve User Preferences
   *
   * @param userPreferencesIdentity Implicit reference to currently authorized user.
   */
  public async list(userPreferencesIdentity: string): Promise<Heroku.UserPreferences> {
    const response = await this.heroku.get<Heroku.UserPreferences>(`/users/${userPreferencesIdentity}/preferences`, {
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
  public async update(
    userPreferencesIdentity: string,
    body: Heroku.UserPreferencesUpdatePayload
  ): Promise<Heroku.UserPreferences> {
    const response = await this.heroku.patch<Heroku.UserPreferences>(`/users/${userPreferencesIdentity}/preferences`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
