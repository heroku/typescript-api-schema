"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Identity Provider Actions](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider-actions)
 * Actions taken on Identity Providers, the SSO configuration representation.
 */
class IdentityProviderActionsService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Migrate an Identity Provider
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    async update(identityProviderIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}/migrate`, {
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
exports.default = IdentityProviderActionsService;
