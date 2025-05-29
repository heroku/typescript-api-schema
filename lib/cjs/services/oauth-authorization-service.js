"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - OAuth Authorization](https://devcenter.heroku.com/articles/platform-api-reference#oauth-authorization)
 * OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
class OauthAuthorizationService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new OAuth authorization.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations`, {
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
     * Delete OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param requestInit The initializer for the request.
     */
    async delete(oauthAuthorizationIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}`, {
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
     * Info for an OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param requestInit The initializer for the request.
     */
    async info(oauthAuthorizationIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}`, {
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
     * Update an existing OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(oauthAuthorizationIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}`, {
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
     * List OAuth authorizations.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations`, {
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
     * Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param requestInit The initializer for the request.
     */
    async regenerate(oauthAuthorizationIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/oauth/authorizations/${oauthAuthorizationIdentity}/actions/regenerate-tokens`, {
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
exports.default = OauthAuthorizationService;
