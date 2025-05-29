import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Log Drain](https://devcenter.heroku.com/articles/platform-api-reference#space-log-drain)
 * Single log drain for all apps in a Private Space
 */
export default class SpaceLogDrainService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Current log drain for a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async info(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/log-drain`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain>;
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
   * Update log drain for a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    spaceIdentity: string,
    payload: Heroku.SpaceLogDrainUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogDrain> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/log-drain`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PUT',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.LogDrain>;
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
