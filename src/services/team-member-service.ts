import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Member](https://devcenter.heroku.com/articles/platform-api-reference#team-member)
 * A team member is an individual with access to a team.
 */
export default class TeamMemberService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new team member, or update their role.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async createOrUpdate(
    teamIdentity: string,
    payload: Heroku.TeamMemberCreateOrUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamMember> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/members`, {
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
      return (await response.json()) as Promise<Heroku.TeamMember>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a new team member.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    teamIdentity: string,
    payload: Heroku.TeamMemberCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamMember> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/members`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
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
  /**
   * Update a team member.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    teamIdentity: string,
    payload: Heroku.TeamMemberUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamMember> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/members`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
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
  /**
   * Remove a member from the team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    teamIdentity: string,
    teamMemberIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamMember> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/members/${teamMemberIdentity}`, {
      ...requestInit,

      method: 'DELETE',
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
  /**
   * List members of the team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamMember[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/members`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamMember[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List the apps of a team member.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
   * @param requestInit The initializer for the request.
   */
  public async listByMember(
    teamIdentity: string,
    teamMemberIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamApp[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/members/${teamMemberIdentity}/apps`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamApp[]>;
    }
    throw new Error(response.statusText);
  }
}
