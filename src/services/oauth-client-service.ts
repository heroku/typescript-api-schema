import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Client](https://devcenter.heroku.com/articles/platform-api-reference#oauth-client)
 * OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
 */
export default class OauthClientService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new OAuth client.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.OauthClientCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthClient> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/clients`, {
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
      return (await response.json()) as Promise<Heroku.OauthClient>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete OAuth client.
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    oauthClientIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthClient> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/clients/${oauthClientIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthClient>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for an OAuth client. The output for unauthenticated requests excludes the `secret` parameter.
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   * @param requestInit The initializer for the request.
   */
  public async info(
    oauthClientIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/oauth/clients/${oauthClientIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
  }
  /**
   * List OAuth clients
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.OauthClient[]> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/clients`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.OauthClient[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update OAuth client
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    oauthClientIdentity: string,
    payload: Heroku.OauthClientUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthClient> {
    const response = await this.fetchImpl(`${this.endpoint}/oauth/clients/${oauthClientIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.OauthClient>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Rotate credentials for an OAuth client
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   * @param requestInit The initializer for the request.
   */
  public async rotateCredentials(
    oauthClientIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.OauthClient> {
    const response = await this.fetchImpl(
      `${this.endpoint}/oauth/clients/${oauthClientIdentity}/actions/rotate-credentials`,
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
      return (await response.json()) as Promise<Heroku.OauthClient>;
    }
    throw new Error(response.statusText);
  }
}
