import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Network Address Translation](https://devcenter.heroku.com/articles/platform-api-reference#space-nat)
 * Network address translation (NAT) for stable outbound IP addresses from a space
 */
export default class SpaceNatService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Current state of network address translation for a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async info(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SpaceNat> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/nat`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SpaceNat>;
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
