import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Private Spaces VPN](https://devcenter.heroku.com/articles/platform-api-reference#vpn-connection)
 * [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN.
 */
export default class VpnConnectionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new VPN connection in a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(spaceIdentity: string, payload: Heroku.VpnConnectionCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.VpnConnection>;
    /**
     * Destroy existing VPN Connection
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     * @param requestInit The initializer for the request.
     */
    destroy(spaceIdentity: string, vpnConnectionIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.VpnConnection>;
    /**
     * List VPN connections for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    list(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.VpnConnection[]>;
    /**
     * Info for an existing vpn-connection.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, vpnConnectionIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.VpnConnection>;
    /**
     * Update a VPN connection in a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param vpnConnectionIdentity VPN ID or VPN Name.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(spaceIdentity: string, vpnConnectionIdentity: string, payload: Heroku.VpnConnectionUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.VpnConnection>;
}
