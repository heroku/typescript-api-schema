import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account)
 * Enterprise accounts allow companies to manage their development teams and billing.
 */
export default class EnterpriseAccountService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List enterprise accounts in which you are a member.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccount[]>;
    /**
     * Information about an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param requestInit The initializer for the request.
     */
    info(enterpriseAccountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccount>;
    /**
     * Update enterprise account properties
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(enterpriseAccountIdentity: string, payload: Heroku.EnterpriseAccountUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccount>;
}
