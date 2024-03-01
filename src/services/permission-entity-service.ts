import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Permission Entity](https://devcenter.heroku.com/articles/platform-api-reference#permission-entity)
 * An owned entity including users' permissions.
 */
export default class PermissionEntityService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List permission entities for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async list(teamIdentity: string): Promise<Heroku.PermissionEntity[]> {
    const response = await this.heroku.get<Heroku.PermissionEntity[]>(`/teams/${teamIdentity}/permissions`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
