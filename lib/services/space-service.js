/**
 Heroku Platform API - Space
A space is an isolated, highly available, secure app execution environment.

*/
export default class SpaceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List existing spaces.
 *
 */
    async list() {
        const response = await this.heroku.get(`/spaces`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info for existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    async info(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param body Object to send to the endpoint.
     */
    async update(spaceIdentity, body) {
        const response = await this.heroku.patch(`/spaces/${spaceIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    async delete(spaceIdentity) {
        const response = await this.heroku.delete(`/spaces/${spaceIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Create a new space.
     *
     * @param body Object to send to the endpoint.
     */
    async create(body) {
        const response = await this.heroku.post(`/spaces`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
