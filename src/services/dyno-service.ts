import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Dyno](https://devcenter.heroku.com/articles/platform-api-reference#dyno)
 * Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
 */
export default class DynoService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.DynoCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Dyno> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos`, {
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
      return (await response.json()) as Promise<Heroku.Dyno>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Restart dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
   * @param requestInit The initializer for the request.
   */
  public async restart(
    appIdentity: string,
    dynoIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos/${dynoIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Restart all dynos.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async restartAll(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Stop dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
   * @param requestInit The initializer for the request.
   */
  public async stop(
    appIdentity: string,
    dynoIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos/${dynoIdentity}/actions/stop`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    dynoIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Dyno> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos/${dynoIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Dyno>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing dynos.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Dyno[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Dyno[]>;
    }
    throw new Error(response.statusText);
  }
}
