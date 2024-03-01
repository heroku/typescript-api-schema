/**
 Heroku Platform API - Space Network Address Translation
Network address translation (NAT) for stable outbound IP addresses from a space

*/
export default class SpaceNatService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Current state of network address translation for a space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    async info(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/nat`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
