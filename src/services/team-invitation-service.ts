import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invitation](https://devcenter.heroku.com/articles/platform-api-reference#team-invitation)
 * A team invitation represents an invite to a team.
 */
export default class TeamInvitationService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Get a list of a team's Identity Providers
   *
   * @param teamName unique name of team
   * @example example.
   */
  public async list(teamName: string): Promise<Heroku.TeamInvitation[]> {
    const response = await this.heroku.get<Heroku.TeamInvitation[]>(`/teams/${teamName}/invitations`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create Team Invitation
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param body Object to send to the endpoint.
   */
  public async create(teamIdentity: string, body: Heroku.TeamInvitationCreatePayload): Promise<Heroku.TeamInvitation> {
    const response = await this.heroku.put<Heroku.TeamInvitation>(`/teams/${teamIdentity}/invitations`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Revoke a team invitation.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamInvitationIdentity unique identifier of an invitation.
   */
  public async revoke(teamIdentity: string, teamInvitationIdentity: string): Promise<Heroku.TeamInvitation> {
    const response = await this.heroku.delete<Heroku.TeamInvitation>(
      `/teams/${teamIdentity}/invitations/${teamInvitationIdentity}`,
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
   * Get an invitation by its token
   *
   * @param teamInvitationToken special token for invitation
   * @example 614ae25aa2d4802096cd7c18625b526c.
   */
  public async get(teamInvitationToken: string): Promise<Heroku.TeamInvitation> {
    const response = await this.heroku.get<Heroku.TeamInvitation>(`/teams/invitations/${teamInvitationToken}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Accept Team Invitation
   *
   * @param teamInvitationToken special token for invitation
   * @example 614ae25aa2d4802096cd7c18625b526c.
   */
  public async accept(teamInvitationToken: string): Promise<Heroku.TeamMember> {
    const response = await this.heroku.post<Heroku.TeamMember>(`/teams/invitations/${teamInvitationToken}/accept`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
