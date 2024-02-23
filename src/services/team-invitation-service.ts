import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invitation](https://devcenter.heroku.com/articles/platform-api-reference#team-invitation)
 * A team invitation represents an invite to a team.
 */
export default class TeamInvitationService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Get a list of a team's Identity Providers
   *
   * @param teamName unique name of team
   * @example "example".
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamName: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamInvitation[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamName}/invitations`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create Team Invitation
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    teamIdentity: string,
    payload: Heroku.TeamInvitationCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamInvitation> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/invitations`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PUT',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Revoke a team invitation.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamInvitationIdentity unique identifier of an invitation.
   * @param requestInit The initializer for the request.
   */
  public async revoke(
    teamIdentity: string,
    teamInvitationIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamInvitation> {
    const response = await this.fetchImpl(
      `${this.endpoint}/teams/${teamIdentity}/invitations/${teamInvitationIdentity}`,
      {
        ...requestInit,

        method: 'DELETE',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Get an invitation by its token
   *
   * @param teamInvitationToken special token for invitation
   * @example "614ae25aa2d4802096cd7c18625b526c".
   * @param requestInit The initializer for the request.
   */
  public async get(
    teamInvitationToken: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamInvitation> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/invitations/${teamInvitationToken}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Accept Team Invitation
   *
   * @param teamInvitationToken special token for invitation
   * @example "614ae25aa2d4802096cd7c18625b526c".
   * @param requestInit The initializer for the request.
   */
  public async accept(
    teamInvitationToken: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamMember> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/invitations/${teamInvitationToken}/accept`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamMember>;
    }
    throw new Error(response.statusText);
  }
}
