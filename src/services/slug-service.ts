import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Slug](https://devcenter.heroku.com/articles/platform-api-reference#slug)
 * A slug is a snapshot of your application code that is ready to run on the platform.
 */
export default class SlugService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * Info for existing slug.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param slugIdentity unique identifier of slug.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    slugIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Slug> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/slugs/${slugIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Slug>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a new slug. For more information please refer to [Deploying Slugs using the Platform API](https://devcenter.heroku.com/articles/platform-api-deploying-slugs).
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.SlugCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Slug> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/slugs`, {
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
      return (await response.json()) as Promise<Heroku.Slug>;
    }
    throw new Error(response.statusText);
  }
}