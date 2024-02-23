/**
 * [Heroku Platform API - Peering Info](https://devcenter.heroku.com/articles/platform-api-reference#peering-info)
 * [Peering Info](https://devcenter.heroku.com/articles/private-space-peering) gives you the information necessary to peer an AWS VPC to a Private Space.
 */
export default class PeeringInfoService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Provides the necessary information to establish an AWS VPC Peering with your private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async info(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/peering-info`, {
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
