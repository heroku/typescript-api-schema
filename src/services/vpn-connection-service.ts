import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Private Spaces VPN](https://devcenter.heroku.com/articles/platform-api-reference#vpn-connection)
 * [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN.
 */
export default class VpnConnectionService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new VPN connection in a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param body Object to send to the endpoint.
   */
  public async create(spaceIdentity: string, body: Heroku.VpnConnectionCreatePayload): Promise<Heroku.VpnConnection> {
    const response = await this.heroku.post<Heroku.VpnConnection>(`/spaces/${spaceIdentity}/vpn-connections`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Destroy existing VPN Connection
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param vpnConnectionIdentity VPN ID or VPN Name.
   */
  public async destroy(spaceIdentity: string, vpnConnectionIdentity: string): Promise<Heroku.VpnConnection> {
    const response = await this.heroku.delete<Heroku.VpnConnection>(
      `/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * List VPN connections for a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async list(spaceIdentity: string): Promise<Heroku.VpnConnection[]> {
    const response = await this.heroku.get<Heroku.VpnConnection[]>(`/spaces/${spaceIdentity}/vpn-connections`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for an existing vpn-connection.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param vpnConnectionIdentity VPN ID or VPN Name.
   */
  public async info(spaceIdentity: string, vpnConnectionIdentity: string): Promise<Heroku.VpnConnection> {
    const response = await this.heroku.get<Heroku.VpnConnection>(
      `/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Update a VPN connection in a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param vpnConnectionIdentity VPN ID or VPN Name.
   * @param body Object to send to the endpoint.
   */
  public async update(
    spaceIdentity: string,
    vpnConnectionIdentity: string,
    body: Heroku.VpnConnectionUpdatePayload
  ): Promise<Heroku.VpnConnection> {
    const response = await this.heroku.patch<Heroku.VpnConnection>(
      `/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
