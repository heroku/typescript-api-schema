"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - OAuth Client](https://devcenter.heroku.com/articles/platform-api-reference#oauth-client)
 * OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
 */
class OauthClientService {
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
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
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
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
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
                Accept: 'application/vnd.heroku+json; version=3.sdk'
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
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
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
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
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
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = OauthClientService;
