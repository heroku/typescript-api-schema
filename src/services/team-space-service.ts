import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Space](https://devcenter.heroku.com/articles/platform-api-reference#team-space)
 * A space is an isolated, highly available, secure app execution environment.
 */
export default class TeamSpaceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List spaces owned by the team
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async list(teamIdentity: string): Promise<Heroku.Space[]> {
    const response = await this.heroku.get<Heroku.Space[]>(`/teams/${teamIdentity}/spaces`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
