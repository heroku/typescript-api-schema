import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App](https://devcenter.heroku.com/articles/platform-api-reference#team-app)
 * A team app encapsulates the team specific functionality of Heroku apps.
 */
export default class TeamAppService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.TeamAppCreatePayload): Promise<Heroku.TeamApp> {
    const response = await this.heroku.post<Heroku.TeamApp>(`/teams/apps`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for a team app.
   *
   * @param teamAppIdentity unique name of app.
   */
  public async info(teamAppIdentity: string): Promise<Heroku.TeamApp> {
    const response = await this.heroku.get<Heroku.TeamApp>(`/teams/apps/${teamAppIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Lock or unlock a team app.
   *
   * @param teamAppIdentity unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async updateLocked(teamAppIdentity: string, body: Heroku.TeamAppUpdateLockedPayload): Promise<Heroku.TeamApp> {
    const response = await this.heroku.patch<Heroku.TeamApp>(`/teams/apps/${teamAppIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Transfer an existing team app to another Heroku account.
   *
   * @param teamAppIdentity unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async transferToAccount(teamAppIdentity: string, body: Heroku.TeamAppTransferToAccountPayload): Promise<void> {
    const response = await this.heroku.patch<void>(`/teams/apps/${teamAppIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Transfer an existing team app to another team.
   *
   * @param teamAppIdentity unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async transferToTeam(
    teamAppIdentity: string,
    body: Heroku.TeamAppTransferToTeamPayload
  ): Promise<Heroku.TeamApp> {
    const response = await this.heroku.patch<Heroku.TeamApp>(`/teams/apps/${teamAppIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * List team apps.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async listByTeam(teamIdentity: string): Promise<Heroku.TeamApp[]> {
    const response = await this.heroku.get<Heroku.TeamApp[]>(`/teams/${teamIdentity}/apps`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
