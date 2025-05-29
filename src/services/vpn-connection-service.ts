import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Private Spaces VPN](https://devcenter.heroku.com/articles/platform-api-reference#vpn-connection)
 * [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN.
 */
export default class VpnConnectionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new VPN connection in a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    spaceIdentity: string,
    payload: Heroku.VpnConnectionCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.VpnConnection> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/vpn-connections`, {
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
      return (await response.json()) as Promise<Heroku.VpnConnection>;
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
   * Destroy existing VPN Connection
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param vpnConnectionIdentity VPN ID or VPN Name.
   * @param requestInit The initializer for the request.
   */
  public async destroy(
    spaceIdentity: string,
    vpnConnectionIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.VpnConnection> {
    const response = await this.fetchImpl(
      `${this.endpoint}/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`,
      {
        ...requestInit,

        method: 'DELETE',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.VpnConnection>;
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
   * List VPN connections for a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async list(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.VpnConnection[]> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/vpn-connections`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.VpnConnection[]>;
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
   * Info for an existing vpn-connection.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param vpnConnectionIdentity VPN ID or VPN Name.
   * @param requestInit The initializer for the request.
   */
  public async info(
    spaceIdentity: string,
    vpnConnectionIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.VpnConnection> {
    const response = await this.fetchImpl(
      `${this.endpoint}/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.VpnConnection>;
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
   * Update a VPN connection in a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param vpnConnectionIdentity VPN ID or VPN Name.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    spaceIdentity: string,
    vpnConnectionIdentity: string,
    payload: Heroku.VpnConnectionUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.VpnConnection> {
    const response = await this.fetchImpl(
      `${this.endpoint}/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'PATCH',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.VpnConnection>;
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
