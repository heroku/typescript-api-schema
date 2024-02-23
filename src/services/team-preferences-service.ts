import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Preferences](https://devcenter.heroku.com/articles/platform-api-reference#team-preferences)
 * Tracks a Team's Preferences
 */
export default class TeamPreferencesService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Retrieve Team Preferences
   *
   * @param teamPreferencesIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamPreferencesIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamPreferences> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamPreferencesIdentity}/preferences`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamPreferences>;
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
  public async update(
    teamPreferencesIdentity: string,
    payload: Heroku.TeamPreferencesUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamPreferences> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamPreferencesIdentity}/preferences`, {
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
      return (await response.json()) as Promise<Heroku.TeamPreferences>;
    }
    throw new Error(response.statusText);
  }
}
