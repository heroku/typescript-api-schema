import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering](https://devcenter.heroku.com/articles/platform-api-reference#peering)
 * [Peering](https://devcenter.heroku.com/articles/private-space-vpc-peering?preview=1) provides a way to peer your Private Space VPC to another AWS VPC.
 */
export default class PeeringService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Provides the necessary information to establish an AWS VPC Peering with your private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async info(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PeeringInfo> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peering-info`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PeeringInfo>;
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
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Peering[]>;
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
   * Accept a pending peering connection with a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async accept(
    spaceIdentity: string,
    payload: Heroku.PeeringAcceptPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Peering> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings`, {
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
      return (await response.json()) as Promise<Heroku.Peering>;
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
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Peering>;
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
