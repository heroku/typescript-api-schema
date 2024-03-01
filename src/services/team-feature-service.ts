import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Feature](https://devcenter.heroku.com/articles/platform-api-reference#team-feature)
 * A team feature represents a feature enabled on a team account.
 */
export default class TeamFeatureService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for an existing team feature.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamFeatureIdentity unique identifier of team feature or unique name of team feature.
   */
  public async info(teamIdentity: string, teamFeatureIdentity: string): Promise<Heroku.TeamFeature> {
    const response = await this.heroku.get<Heroku.TeamFeature>(
      `/teams/${teamIdentity}/features/${teamFeatureIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing team features.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async list(teamIdentity: string): Promise<Heroku.TeamFeature[]> {
    const response = await this.heroku.get<Heroku.TeamFeature[]>(`/teams/${teamIdentity}/features`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
