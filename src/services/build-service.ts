import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Build API - Build](https://devcenter.heroku.com/articles/platform-api-reference#build)
 * A build represents the process of transforming a code tarball into a slug
 */
export default class BuildService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * Create a new build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.BuildCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Build> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/builds`, {
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
      return (await response.json()) as Promise<Heroku.Build>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param buildIdentity unique identifier of build.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    buildIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Build> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/builds/${buildIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Build>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Build[]> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/builds`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Build[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Destroy a build cache.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async deleteCache(appIdentity: string, requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<void> {
    await this.fetchImpl(`/apps/${appIdentity}/build-cache`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
  }
  /**
   * Cancel running build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param buildIdentity unique identifier of build.
   * @param requestInit The initializer for the request.
   */
  public async cancel(
    appIdentity: string,
    buildIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Build> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/builds/${buildIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Build>;
    }
    throw new Error(response.statusText);
  }
}