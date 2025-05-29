import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Topology](https://devcenter.heroku.com/articles/platform-api-reference#space-topology)
 * Space Topology provides you with a mechanism for viewing all the running dynos, formations and applications for a space. This is the same data thats used to power our DNS Service Discovery.
 */
export default class SpaceTopologyService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Current space topology
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async topology(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SpaceTopology> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/topology`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SpaceTopology>;
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
