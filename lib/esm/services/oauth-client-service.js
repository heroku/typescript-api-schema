/**
 * [Heroku Platform API - OAuth Client](https://devcenter.heroku.com/articles/platform-api-reference#oauth-client)
 * OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
 */
export default class OauthClientService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new OAuth client.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/clients`, {
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
     * Delete OAuth client.
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param requestInit The initializer for the request.
     */
    async delete(oauthClientIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/clients/${oauthClientIdentity}`, {
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
     * Info for an OAuth client. The output for unauthenticated requests excludes the `secret` parameter.
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param requestInit The initializer for the request.
     */
    async info(oauthClientIdentity, requestInit = {}) {
        await this.fetchImpl(`/oauth/clients/${oauthClientIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
    }
    /**
     * List OAuth clients
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/clients`, {
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
     * Update OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(oauthClientIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/clients/${oauthClientIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
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
     * Rotate credentials for an OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param requestInit The initializer for the request.
     */
    async rotateCredentials(oauthClientIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/clients/${oauthClientIdentity}/actions/rotate-credentials`, {
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
}
