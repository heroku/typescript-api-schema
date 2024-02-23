import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Add-on](https://devcenter.heroku.com/articles/platform-api-reference#team-add-on)
 *
 */
export default class TeamAddOnService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List add-ons used across all Team apps
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async listForTeam(teamIdentity: string): Promise<Heroku.AddOn[]> {
    const response = await this.heroku.get<Heroku.AddOn[]>(`/teams/${teamIdentity}/addons`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
