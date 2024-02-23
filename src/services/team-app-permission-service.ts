import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Permission](https://devcenter.heroku.com/articles/platform-api-reference#team-app-permission)
 * A team app permission is a behavior that is assigned to a user in a team app.
 */
export default class TeamAppPermissionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Lists permissions available to teams.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.TeamAppPermission[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/permissions`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamAppPermission[]>;
    }
    throw new Error(response.statusText);
  }
}
