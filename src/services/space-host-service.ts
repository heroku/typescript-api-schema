import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Host](https://devcenter.heroku.com/articles/platform-api-reference#space-host)
 * [Space Hosts](https://devcenter.heroku.com/articles/private-spaces-dedicated-hosts?preview=1) lists dedicated hosts allocated to a space
 */
export default class SpaceHostService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List hosts
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async list(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SpaceHost[]> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/hosts`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SpaceHost[]>;
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
