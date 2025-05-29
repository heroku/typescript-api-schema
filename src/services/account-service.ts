import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account](https://devcenter.heroku.com/articles/platform-api-reference#account)
 * An account represents an individual signed up to use the Heroku platform.
 */
export default class AccountService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for account.
   *
   * @param requestInit The initializer for the request.
   */
  public async info(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Account> {
    const response = await this.fetchImpl(`${this.endpoint}/account`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Account>;
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
   * Update account.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    payload: Heroku.AccountUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Account> {
    const response = await this.fetchImpl(`${this.endpoint}/account`, {
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
      return (await response.json()) as Promise<Heroku.Account>;
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
   * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
   *
   * @param requestInit The initializer for the request.
   */
  public async delete(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Account> {
    const response = await this.fetchImpl(`${this.endpoint}/account`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Account>;
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
   * Info for account.
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async infoByUser(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Account> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Account>;
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
   * Update account.
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async updateByUser(
    accountIdentity: string,
    payload: Heroku.AccountUpdateByUserPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Account> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.Account>;
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
   * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async deleteByUser(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Account> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Account>;
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
