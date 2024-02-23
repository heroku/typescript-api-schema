import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Authorization](https://devcenter.heroku.com/articles/platform-api-reference#oauth-authorization)
 * OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthAuthorizationService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new OAuth authorization.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.OauthAuthorizationCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthAuthorization> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations`, {
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
      return (await response.json()) as Promise<Heroku.OauthAuthorization>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete OAuth authorization.
   *
   * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    oauthAuthorizationIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthAuthorization> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthAuthorization>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for an OAuth authorization.
   *
   * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
   * @param requestInit The initializer for the request.
   */
  public async info(
    oauthAuthorizationIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthAuthorization> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthAuthorization>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List OAuth authorizations.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.OauthAuthorization[]> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthAuthorization[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients.
   *
   * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
   * @param requestInit The initializer for the request.
   */
  public async regenerate(
    oauthAuthorizationIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthAuthorization> {
    const response = await this.fetchImpl(
      `${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}/actions/regenerate-tokens`,
      {
        ...requestInit,

        method: 'POST',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthAuthorization>;
    }
    throw new Error(response.statusText);
  }
}
