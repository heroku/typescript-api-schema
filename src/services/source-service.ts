import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Source](https://devcenter.heroku.com/articles/platform-api-reference#source)
 * A source is a location for uploading and downloading an application's source code.
 */
export default class SourceService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create URLs for uploading and downloading source.
   *
   * @param requestInit The initializer for the request.
   */
  public async create(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Source> {
    const response = await this.fetchImpl(`${this.endpoint}/sources`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Source>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create URLs for uploading and downloading source. Deprecated in favor of `POST /sources`
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async createDeprecated(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Source> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sources`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Source>;
    }
    throw new Error(response.statusText);
  }
}
