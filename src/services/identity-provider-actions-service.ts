import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider Actions](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider-actions)
 * Actions taken on Identity Providers, the SSO configuration representation.
 */
export default class IdentityProviderActionsService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Migrate an Identity Provider
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param requestInit The initializer for the request.
   */
  public async update(
    identityProviderIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}/migrate`, {
      ...requestInit,

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
}
