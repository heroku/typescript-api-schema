/**
 Heroku Platform API - Peering
[Peering](https://devcenter.heroku.com/articles/private-space-peering) provides a way to peer your Private Space VPC to another AWS VPC.

*/
export default class PeeringService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List peering connections of a private space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    async list(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/peerings`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Accept a pending peering connection with a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering..
     */
    async accept(spaceIdentity, peeringPcxId) {
        const response = await this.heroku.post(`/spaces/${spaceIdentity}/peerings/${peeringPcxId}/actions/accept`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Destroy an active peering connection with a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering..
     */
    async destroy(spaceIdentity, peeringPcxId) {
        const response = await this.heroku.delete(`/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Fetch information for existing peering connection
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering..
     */
    async info(spaceIdentity, peeringPcxId) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
