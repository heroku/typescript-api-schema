/**
 * [Heroku Platform API - Private Spaces VPN](https://devcenter.heroku.com/articles/platform-api-reference#vpn-connection)
 * [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN.
 */
export default class VpnConnectionService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new VPN connection in a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(spaceIdentity, payload, requestInit = {}) {
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
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
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
    async destroy(spaceIdentity, vpnConnectionIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`, {
            ...requestInit,
            method: 'DELETE',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
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
    async list(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/vpn-connections`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
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
    async info(spaceIdentity, vpnConnectionIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
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
    async update(spaceIdentity, vpnConnectionIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/vpn-connections/${vpnConnectionIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
