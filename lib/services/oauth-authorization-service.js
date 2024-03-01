/**
 Heroku Platform API - OAuth Authorization
OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

*/
export default class OauthAuthorizationService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new OAuth authorization.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/oauth/authorizations`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     */
    async delete(oauthAuthorizationIdentity) {
        const response = await this.heroku.delete(`/oauth/authorizations/${oauthAuthorizationIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for an OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     */
    async info(oauthAuthorizationIdentity) {
        const response = await this.heroku.get(`/oauth/authorizations/${oauthAuthorizationIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List OAuth authorizations.
     *
     */
    async list() {
        const response = await this.heroku.get(`/oauth/authorizations`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     */
    async regenerate(oauthAuthorizationIdentity) {
        const response = await this.heroku.post(`/oauth/authorizations/${oauthAuthorizationIdentity}/actions/regenerate-tokens`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
