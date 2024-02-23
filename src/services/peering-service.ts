import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering](https://devcenter.heroku.com/articles/platform-api-reference#peering)
 * [Peering](https://devcenter.heroku.com/articles/private-space-peering) provides a way to peer your Private Space VPC to another AWS VPC.
 */
export default class PeeringService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List peering connections of a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async list(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Peering[]> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Peering[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Accept a pending peering connection with a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
   * @example "pcx-123456789012".
   * @param requestInit The initializer for the request.
   */
  public async accept(
    spaceIdentity: string,
    peeringPcxId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Peering> {
    const response = await this.fetchImpl(
      `${this.endpoint}/spaces/${spaceIdentity}/peerings/${peeringPcxId}/actions/accept`,
      {
        ...requestInit,

        method: 'POST',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Peering>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Destroy an active peering connection with a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
   * @example "pcx-123456789012".
   * @param requestInit The initializer for the request.
   */
  public async destroy(
    spaceIdentity: string,
    peeringPcxId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Peering> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Peering>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Fetch information for existing peering connection
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
   * @example "pcx-123456789012".
   * @param requestInit The initializer for the request.
   */
  public async info(
    spaceIdentity: string,
    peeringPcxId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Peering> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Peering>;
    }
    throw new Error(response.statusText);
  }
}
