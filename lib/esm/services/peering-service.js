/**
 * [Heroku Platform API - Peering](https://devcenter.heroku.com/articles/platform-api-reference#peering)
 * [Peering](https://devcenter.heroku.com/articles/private-space-peering) provides a way to peer your Private Space VPC to another AWS VPC.
 */
export default class PeeringService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List peering connections of a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async list(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
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
    async accept(spaceIdentity, peeringPcxId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings/${peeringPcxId}/actions/accept`, {
            ...requestInit,
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
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
    async destroy(spaceIdentity, peeringPcxId, requestInit = {}) {
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
            return (await response.json());
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
    async info(spaceIdentity, peeringPcxId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
