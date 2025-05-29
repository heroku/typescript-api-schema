import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Transfer](https://devcenter.heroku.com/articles/platform-api-reference#space-transfer)
 * Transfer spaces between enterprise teams with the same Enterprise Account.
 */
export default class SpaceTransferService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Transfer space between enterprise teams
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async transfer(
    spaceIdentity: string,
    payload: Heroku.SpaceTransferTransferPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Space> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/transfer`, {
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
      return (await response.json()) as Promise<Heroku.Space>;
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
