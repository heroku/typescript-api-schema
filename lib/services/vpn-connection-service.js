/**
 Heroku Platform API - Private Spaces VPN
[VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN.

*/
export default class VpnConnectionService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new VPN connection in a private space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 * @param body Object to send to the endpoint.
 */
    async create(spaceIdentity, body) {
        const response = await this.heroku.post(`/spaces/${spaceIdentity}/vpn-connections`, {
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
    async destroy(spaceIdentity, vpnConnectionIdentity) {
        const response = await this.heroku.delete(`/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List VPN connections for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    async list(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/vpn-connections`, {
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
    async info(spaceIdentity, vpnConnectionIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update a VPN connection in a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     * @param body Object to send to the endpoint.
     */
    async update(spaceIdentity, vpnConnectionIdentity, body) {
        const response = await this.heroku.patch(`/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
