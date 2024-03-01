import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account Member](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-member)
* Enterprise account members are users with access to an enterprise account.
*/
export default class EnterpriseAccountMemberService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List members in an enterprise account.
 *
 * @param enterpriseAccountIdentity unique identifier of the enterprise account.
 */
    list(enterpriseAccountIdentity: string): Promise<Heroku.EnterpriseAccountMember[]>;
    /**
     * Create a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param body Object to send to the endpoint.
     */
    create(enterpriseAccountIdentity: string, body: Heroku.EnterpriseAccountMemberCreatePayload): Promise<Heroku.EnterpriseAccountMember>;
    /**
     * Update a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     * @param body Object to send to the endpoint.
     */
    update(enterpriseAccountIdentity: string, enterpriseAccountMemberUserIdentity: string, body: Heroku.EnterpriseAccountMemberUpdatePayload): Promise<Heroku.EnterpriseAccountMember>;
    /**
     * delete a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     */
    delete(enterpriseAccountIdentity: string, enterpriseAccountMemberUserIdentity: string): Promise<Heroku.EnterpriseAccountMember>;
}
