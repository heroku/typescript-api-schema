import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Private Spaces VPN](https://devcenter.heroku.com/articles/platform-api-reference#vpn-connection)
* [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN.
*/
export default class VpnConnectionService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new VPN connection in a private space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 * @param body Object to send to the endpoint.
 */
    create(spaceIdentity: string, body: Heroku.VpnConnectionCreatePayload): Promise<Heroku.VpnConnection>;
    /**
     * Destroy existing VPN Connection
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     */
    destroy(spaceIdentity: string, vpnConnectionIdentity: string): Promise<Heroku.VpnConnection>;
    /**
     * List VPN connections for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    list(spaceIdentity: string): Promise<Heroku.VpnConnection[]>;
    /**
     * Info for an existing vpn-connection.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     */
    info(spaceIdentity: string, vpnConnectionIdentity: string): Promise<Heroku.VpnConnection>;
    /**
     * Update a VPN connection in a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     * @param body Object to send to the endpoint.
     */
    update(spaceIdentity: string, vpnConnectionIdentity: string, body: Heroku.VpnConnectionUpdatePayload): Promise<Heroku.VpnConnection>;
}
