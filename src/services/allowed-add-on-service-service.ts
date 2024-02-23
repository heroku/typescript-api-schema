import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Allowed Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#allowed-add-on-service)
 * Entities that have been allowed to be used by a Team
 */
export default class AllowedAddOnServiceService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List all allowed add-on services for a team
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async listByTeam(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AllowedAddOnService[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/allowed-addon-services`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AllowedAddOnService[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Allow an Add-on Service
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async createByTeam(
    teamIdentity: string,
    payload: Heroku.AllowedAddOnServiceCreateByTeamPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AllowedAddOnService[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/allowed-addon-services`, {
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
      return (await response.json()) as Promise<Heroku.AllowedAddOnService[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Remove an allowed add-on service
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param allowedAddOnServiceIdentity unique identifier for this allowed add-on service record or unique name of this add-on-service.
   * @param requestInit The initializer for the request.
   */
  public async deleteByTeam(
    teamIdentity: string,
    allowedAddOnServiceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AllowedAddOnService> {
    const response = await this.fetchImpl(
      `${this.endpoint}/teams/${teamIdentity}/allowed-addon-services/${allowedAddOnServiceIdentity}`,
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
      return (await response.json()) as Promise<Heroku.AllowedAddOnService>;
    }
    throw new Error(response.statusText);
  }
}
