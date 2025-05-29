import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider)
 * Identity Providers represent the SSO configuration of an Enterprise Account or Team.
 */
export default class IdentityProviderService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for an Identity Provider
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param requestInit The initializer for the request.
   */
  public async info(
    identityProviderIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProvider>;
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
   * Create an Identity Provider
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.IdentityProviderCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(`${this.endpoint}/identity-providers`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProvider>;
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
   * Update an Identity Provider
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    identityProviderIdentity: string,
    payload: Heroku.IdentityProviderUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProvider>;
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
