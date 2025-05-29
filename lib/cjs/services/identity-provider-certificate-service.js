"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Certificates](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider-certificate)
 * Certificates represent an sso cert attached to an Identity Provider
 */
class IdentityProviderCertificateService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Destroy a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    async delete(identityProviderIdentity, identityProviderIdentity1, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates/${identityProviderIdentity1}`, {
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
     * Create a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(identityProviderIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates`, {
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
     * Update a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(identityProviderIdentity, identityProviderIdentity1, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates/${identityProviderIdentity1}`, {
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
     * Get a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    async info(identityProviderIdentity, identityProviderIdentity1, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates/${identityProviderIdentity1}`, {
            ...requestInit,
            method: 'Get',
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
exports.default = IdentityProviderCertificateService;
