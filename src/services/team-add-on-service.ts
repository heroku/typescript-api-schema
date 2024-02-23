import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Add-on](https://devcenter.heroku.com/articles/platform-api-reference#team-add-on)
 *
 */
export default class TeamAddOnService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List add-ons used across all Team apps
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async listForTeam(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOn[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/addons`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOn[]>;
    }
    throw new Error(response.statusText);
  }
}
