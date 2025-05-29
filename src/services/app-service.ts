import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App](https://devcenter.heroku.com/articles/platform-api-reference#app)
 * An app represents the program that you would like to deploy and run on Heroku.
 */
export default class AppService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new app.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.AppCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps`, {
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
      return (await response.json()) as Promise<Heroku.App>;
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
   * Delete an existing app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App>;
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
   * Info for existing app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async info(appIdentity: string, requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App>;
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
   * List existing apps.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.App[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App[]>;
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
   * List owned and collaborated apps (excludes team apps).
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async listOwnedAndCollaborated(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App[]> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/apps`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App[]>;
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
   * Update an existing app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    payload: Heroku.AppUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.App>;
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
   * Enable ACM flag for an app
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async enableAcm(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/acm`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App>;
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
   * Disable ACM flag for an app
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async disableAcm(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/acm`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App>;
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
   * Refresh ACM for an app
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async refreshAcm(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.App> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/acm`, {
      ...requestInit,

      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App>;
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
