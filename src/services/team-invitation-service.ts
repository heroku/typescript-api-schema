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
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
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
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
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
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
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
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvitation>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
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
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamMember>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
