/**
 * [Heroku Platform API - Enterprise Account](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account)
 * Enterprise accounts allow companies to manage their development teams and billing.
 */
export default class EnterpriseAccountService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List enterprise accounts in which you are a member.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts`, {
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
     * Information about an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param requestInit The initializer for the request.
     */
    async info(enterpriseAccountIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}`, {
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
     * Update enterprise account properties
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(enterpriseAccountIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}`, {
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
