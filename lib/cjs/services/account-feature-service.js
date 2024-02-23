"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Account Feature](https://devcenter.heroku.com/articles/platform-api-reference#account-feature)
 * An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
 */
class AccountFeatureService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for an existing account feature.
     *
     * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
     * @param requestInit The initializer for the request.
     */
    async info(accountFeatureIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/features/${accountFeatureIdentity}`, {
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
     * List existing account features.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/features`, {
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
     * Update an existing account feature.
     *
     * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(accountFeatureIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/features/${accountFeatureIdentity}`, {
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
}
exports.default = AccountFeatureService;
