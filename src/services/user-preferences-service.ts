import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - User Preferences](https://devcenter.heroku.com/articles/platform-api-reference#user-preferences)
 * Tracks a user's preferences and message dismissals
 */
export default class UserPreferencesService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * Retrieve User Preferences
   *
   * @param userPreferencesIdentity Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async list(
    userPreferencesIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.UserPreferences> {
    const response = await this.fetchImpl(`/users/${userPreferencesIdentity}/preferences`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.UserPreferences>;
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
  public async update(
    userPreferencesIdentity: string,
    payload: Heroku.UserPreferencesUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.UserPreferences> {
    const response = await this.fetchImpl(`/users/${userPreferencesIdentity}/preferences`, {
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
      return (await response.json()) as Promise<Heroku.UserPreferences>;
    }
    throw new Error(response.statusText);
  }
}