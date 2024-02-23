import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Member](https://devcenter.heroku.com/articles/platform-api-reference#team-member)
 * A team member is an individual with access to a team.
 */
export default class TeamMemberService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new team member, or update their role.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param body Object to send to the endpoint.
   */
  public async createOrUpdate(
    teamIdentity: string,
    body: Heroku.TeamMemberCreateOrUpdatePayload
  ): Promise<Heroku.TeamMember> {
    const response = await this.heroku.put<Heroku.TeamMember>(`/teams/${teamIdentity}/members`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Create a new team member.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param body Object to send to the endpoint.
   */
  public async create(teamIdentity: string, body: Heroku.TeamMemberCreatePayload): Promise<Heroku.TeamMember> {
    const response = await this.heroku.post<Heroku.TeamMember>(`/teams/${teamIdentity}/members`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Update a team member.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param body Object to send to the endpoint.
   */
  public async update(teamIdentity: string, body: Heroku.TeamMemberUpdatePayload): Promise<Heroku.TeamMember> {
    const response = await this.heroku.patch<Heroku.TeamMember>(`/teams/${teamIdentity}/members`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Remove a member from the team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
   */
  public async delete(teamIdentity: string, teamMemberIdentity: string): Promise<Heroku.TeamMember> {
    const response = await this.heroku.delete<Heroku.TeamMember>(
      `/teams/${teamIdentity}/members/${teamMemberIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * List members of the team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async list(teamIdentity: string): Promise<Heroku.TeamMember[]> {
    const response = await this.heroku.get<Heroku.TeamMember[]>(`/teams/${teamIdentity}/members`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List the apps of a team member.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
   */
  public async listByMember(teamIdentity: string, teamMemberIdentity: string): Promise<Heroku.TeamApp[]> {
    const response = await this.heroku.get<Heroku.TeamApp[]>(
      `/teams/${teamIdentity}/members/${teamMemberIdentity}/apps`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
}
