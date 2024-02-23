import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App](https://devcenter.heroku.com/articles/platform-api-reference#team-app)
 * A team app encapsulates the team specific functionality of Heroku apps.
 */
export default class TeamAppService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.TeamAppCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamApp> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/apps`, {
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
      return (await response.json()) as Promise<Heroku.TeamApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for a team app.
   *
   * @param teamAppIdentity unique name of app
   * @example "example".
   * @param requestInit The initializer for the request.
   */
  public async info(
    teamAppIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamApp> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Lock or unlock a team app.
   *
   * @param teamAppIdentity unique name of app
   * @example "example".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async updateLocked(
    teamAppIdentity: string,
    payload: Heroku.TeamAppUpdateLockedPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamApp> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.TeamApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Transfer an existing team app to another Heroku account.
   *
   * @param teamAppIdentity unique name of app
   * @example "example".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async transferToAccount(
    teamAppIdentity: string,
    payload: Heroku.TeamAppTransferToAccountPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/teams/apps/${teamAppIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
  }
  /**
   * Transfer an existing team app to another team.
   *
   * @param teamAppIdentity unique name of app
   * @example "example".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async transferToTeam(
    teamAppIdentity: string,
    payload: Heroku.TeamAppTransferToTeamPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamApp> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.TeamApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List team apps.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async listByTeam(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamApp[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/apps`, {
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
