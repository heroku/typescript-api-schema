/**
 Heroku Platform API - Space Transfer
Transfer spaces between enterprise teams with the same Enterprise Account.

*/
export default class SpaceTransferService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Transfer space between enterprise teams
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 * @param body Object to send to the endpoint.
 */
    async transfer(spaceIdentity, body) {
        const response = await this.heroku.post(`/spaces/${spaceIdentity}/transfer`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
