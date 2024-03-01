/**
 Heroku Platform API - OAuth Client
OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).

*/
export default class OauthClientService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new OAuth client.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/oauth/clients`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete OAuth client.
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     */
    async delete(oauthClientIdentity) {
        const response = await this.heroku.delete(`/oauth/clients/${oauthClientIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for an OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     */
    async info(oauthClientIdentity) {
        const response = await this.heroku.get(`/oauth/clients/${oauthClientIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List OAuth clients
     *
     */
    async list() {
        const response = await this.heroku.get(`/oauth/clients`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param body Object to send to the endpoint.
     */
    async update(oauthClientIdentity, body) {
        const response = await this.heroku.patch(`/oauth/clients/${oauthClientIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Rotate credentials for an OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     */
    async rotateCredentials(oauthClientIdentity) {
        const response = await this.heroku.post(`/oauth/clients/${oauthClientIdentity}/actions/rotate-credentials`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
