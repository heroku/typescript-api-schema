import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Permission](https://devcenter.heroku.com/articles/platform-api-reference#team-app-permission)
 * A team app permission is a behavior that is assigned to a user in a team app.
 */
export default class TeamAppPermissionService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Lists permissions available to teams.
   *
   */
  public async list(): Promise<Heroku.TeamAppPermission[]> {
    const response = await this.heroku.get<Heroku.TeamAppPermission[]>(`/teams/permissions`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
