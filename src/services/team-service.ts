import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team](https://devcenter.heroku.com/articles/platform-api-reference#team)
 * Teams allow you to manage access to a shared group of applications and other resources.
 */
export default class TeamService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List teams in which you are a member.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Team[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Team[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async info(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Team> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Team>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update team properties.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    teamIdentity: string,
    payload: Heroku.TeamUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Team> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.Team>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a new team.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.TeamCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Team> {
    const response = await this.fetchImpl(`${this.endpoint}/teams`, {
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
      return (await response.json()) as Promise<Heroku.Team>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Team> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Team>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List teams for an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param requestInit The initializer for the request.
   */
  public async listByEnterpriseAccount(
    enterpriseAccountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Team[]> {
    const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/teams`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Team[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a team in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async createInEnterpriseAccount(
    enterpriseAccountIdentity: string,
    payload: Heroku.TeamCreateInEnterpriseAccountPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Team> {
    const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/teams`, {
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
      return (await response.json()) as Promise<Heroku.Team>;
    }
    throw new Error(response.statusText);
  }
}
