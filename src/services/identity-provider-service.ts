import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider)
 * Identity Providers represent the SAML configuration of teams or an Enterprise account
 */
export default class IdentityProviderService {
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
  public async listByTeam(
    teamName: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamName}/identity-providers`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProvider[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create an Identity Provider for a team
   *
   * @param teamName unique name of team
   * @example "example".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async createByTeam(
    teamName: string,
    payload: Heroku.IdentityProviderCreateByTeamPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamName}/identity-providers`, {
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
      return (await response.json()) as Promise<Heroku.IdentityProvider>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update a team's Identity Provider
   *
   * @param teamName unique name of team
   * @example "example".
   * @param identityProviderId unique identifier of this identity provider
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async updateByTeam(
    teamName: string,
    identityProviderId: string,
    payload: Heroku.IdentityProviderUpdateByTeamPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(
      `${this.endpoint}/teams/${teamName}/identity-providers/${identityProviderId}`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'PATCH',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProvider>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete a team's Identity Provider
   *
   * @param teamName unique name of team
   * @example "example".
   * @param identityProviderId unique identifier of this identity provider
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async deleteByTeam(
    teamName: string,
    identityProviderId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(
      `${this.endpoint}/teams/${teamName}/identity-providers/${identityProviderId}`,
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
      return (await response.json()) as Promise<Heroku.IdentityProvider>;
    }
    throw new Error(response.statusText);
  }
}
