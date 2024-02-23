import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team](https://devcenter.heroku.com/articles/platform-api-reference#team)
 * Teams allow you to manage access to a shared group of applications and other resources.
 */
export default class TeamService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List teams in which you are a member.
   *
   */
  public async list(): Promise<Heroku.Team[]> {
    const response = await this.heroku.get<Heroku.Team[]>(`/teams`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async info(teamIdentity: string): Promise<Heroku.Team> {
    const response = await this.heroku.get<Heroku.Team>(`/teams/${teamIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update team properties.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param body Object to send to the endpoint.
   */
  public async update(teamIdentity: string, body: Heroku.TeamUpdatePayload): Promise<Heroku.Team> {
    const response = await this.heroku.patch<Heroku.Team>(`/teams/${teamIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Create a new team.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.TeamCreatePayload): Promise<Heroku.Team> {
    const response = await this.heroku.post<Heroku.Team>(`/teams`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async delete(teamIdentity: string): Promise<Heroku.Team> {
    const response = await this.heroku.delete<Heroku.Team>(`/teams/${teamIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * List teams for an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   */
  public async listByEnterpriseAccount(enterpriseAccountIdentity: string): Promise<Heroku.Team[]> {
    const response = await this.heroku.get<Heroku.Team[]>(`/enterprise-accounts/${enterpriseAccountIdentity}/teams`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create a team in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   * @param body Object to send to the endpoint.
   */
  public async createInEnterpriseAccount(
    enterpriseAccountIdentity: string,
    body: Heroku.TeamCreateInEnterpriseAccountPayload
  ): Promise<Heroku.Team> {
    const response = await this.heroku.post<Heroku.Team>(`/enterprise-accounts/${enterpriseAccountIdentity}/teams`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
