import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Release](https://devcenter.heroku.com/articles/platform-api-reference#release)
 * A release represents a combination of code, config vars and add-ons for an app on Heroku.
 */
export default class ReleaseService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param releaseIdentity unique identifier of release or unique version assigned to the release.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    releaseIdentity: string | number,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Release> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/releases/${releaseIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Release>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing releases.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Release[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/releases`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Release[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create new release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.ReleaseCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Release> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/releases`, {
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
      return (await response.json()) as Promise<Heroku.Release>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Rollback to an existing release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async rollback(
    appIdentity: string,
    payload: Heroku.ReleaseRollbackPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Release> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/releases`, {
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
      return (await response.json()) as Promise<Heroku.Release>;
    }
    throw new Error(response.statusText);
  }
}
