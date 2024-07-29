/**
 * [Heroku Platform API - OAuth Token](https://devcenter.heroku.com/articles/platform-api-reference#oauth-token)
 * OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthTokenService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Create a new OAuth token.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`/oauth/tokens`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
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
     * Revoke OAuth access token.
     *
     * @param oauthTokenIdentity unique identifier of OAuth token.
     * @param requestInit The initializer for the request.
     */
    async delete(oauthTokenIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/oauth/tokens/${oauthTokenIdentity}`, {
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
}