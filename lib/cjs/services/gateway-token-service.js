"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Gateway Token](https://devcenter.heroku.com/articles/platform-api-reference#gateway-token)
 * Contains a set of information useful for identifying a user and the type of access this user is allowed to have.
 */
class GatewayTokenService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Generate a gateway token for a user. Note that a JWT version of the
     * token will be available in `Heroku-Gateway-Token` header.
     *
     * @param requestInit The initializer for the request.
     */
    async create(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/~/gateway-tokens`, {
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
    /**
     * Generates a Proxy oauth acccess tokens for the passed in gateway token.
     * This new proxy token is designed to have a shorter lifetime than the
     * user supplied token so it is safe to pass to futher downstream services
     * without increasing the breadth of the long lived tokens.
     *
     * @param requestInit The initializer for the request.
     */
    async oauthToken(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/~/gateway-tokens/oauth-authorization`, {
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
exports.default = GatewayTokenService;
