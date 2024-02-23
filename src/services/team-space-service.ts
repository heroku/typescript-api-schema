import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Space](https://devcenter.heroku.com/articles/platform-api-reference#team-space)
 * A space is an isolated, highly available, secure app execution environment.
 */
export default class TeamSpaceService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * List spaces owned by the team
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Space[]> {
    const response = await this.fetchImpl(`/teams/${teamIdentity}/spaces`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Space[]>;
    }
    throw new Error(response.statusText);
  }
}
