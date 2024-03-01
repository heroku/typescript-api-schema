/**
 Heroku Platform API - Peering Info
[Peering Info](https://devcenter.heroku.com/articles/private-space-peering) gives you the information necessary to peer an AWS VPC to a Private Space.

*/
export default class PeeringInfoService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Provides the necessary information to establish an AWS VPC Peering with your private space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    async info(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/peering-info`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
