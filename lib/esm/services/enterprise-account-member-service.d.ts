import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account Member](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-member)
 * Enterprise account members are users with access to an enterprise account.
 */
export default class EnterpriseAccountMemberService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List members in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param requestInit The initializer for the request.
     */
    list(enterpriseAccountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccountMember[]>;
    /**
     * Create a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(enterpriseAccountIdentity: string, payload: Heroku.EnterpriseAccountMemberCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccountMember>;
    /**
     * Update a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(enterpriseAccountIdentity: string, enterpriseAccountMemberUserIdentity: string, payload: Heroku.EnterpriseAccountMemberUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccountMember>;
    /**
     * delete a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     * @param requestInit The initializer for the request.
     */
    delete(enterpriseAccountIdentity: string, enterpriseAccountMemberUserIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.EnterpriseAccountMember>;
}
