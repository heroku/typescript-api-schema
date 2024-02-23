import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Token](https://devcenter.heroku.com/articles/platform-api-reference#oauth-token)
 * OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthTokenService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new OAuth token.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.OauthTokenCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthToken> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/tokens`, {
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
      return (await response.json()) as Promise<Heroku.OauthToken>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Revoke OAuth access token.
   *
   * @param oauthTokenIdentity unique identifier of OAuth token.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    oauthTokenIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthToken> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/tokens/${oauthTokenIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthToken>;
    }
    throw new Error(response.statusText);
  }
}
