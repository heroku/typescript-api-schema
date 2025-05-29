import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Region](https://devcenter.heroku.com/articles/platform-api-reference#region)
 * A region represents a geographic location in which your application may run.
 */
export default class RegionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing region.
   *
   * @param regionIdentity unique identifier of region or unique name of region.
   * @param requestInit The initializer for the request.
   */
  public async info(
    regionIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Region> {
    const response = await this.fetchImpl(`${this.endpoint}/regions/${regionIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Region>;
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
   * List existing regions.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Region[]> {
    const response = await this.fetchImpl(`${this.endpoint}/regions`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Region[]>;
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
