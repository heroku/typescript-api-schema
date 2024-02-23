import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Dyno Size](https://devcenter.heroku.com/articles/platform-api-reference#dyno-size)
 * Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
 */
export default class DynoSizeService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing dyno size.
   *
   * @param dynoSizeIdentity unique identifier of this dyno size or the name of this dyno-size.
   * @param requestInit The initializer for the request.
   */
  public async info(
    dynoSizeIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.DynoSize> {
    const response = await this.fetchImpl(`${this.endpoint}/dyno-sizes/${dynoSizeIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.DynoSize>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing dyno sizes.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.DynoSize[]> {
    const response = await this.fetchImpl(`${this.endpoint}/dyno-sizes`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.DynoSize[]>;
    }
    throw new Error(response.statusText);
  }
}
