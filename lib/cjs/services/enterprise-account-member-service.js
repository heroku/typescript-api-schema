"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Enterprise Account Member](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-member)
 * Enterprise account members are users with access to an enterprise account.
 */
class EnterpriseAccountMemberService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List members in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param requestInit The initializer for the request.
     */
    async list(enterpriseAccountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members`, {
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
     * Create a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(enterpriseAccountIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members`, {
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
     * Update a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(enterpriseAccountIdentity, enterpriseAccountMemberUserIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`, {
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
     * delete a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     * @param requestInit The initializer for the request.
     */
    async delete(enterpriseAccountIdentity, enterpriseAccountMemberUserIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`, {
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
}
exports.default = EnterpriseAccountMemberService;
