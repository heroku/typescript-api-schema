import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account)
* Enterprise accounts allow companies to manage their development teams and billing.
*/
export default class EnterpriseAccountService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List enterprise accounts in which you are a member.
 *
 */
    list(): Promise<Heroku.EnterpriseAccount[]>;
    /**
     * Information about an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     */
    info(enterpriseAccountIdentity: string): Promise<Heroku.EnterpriseAccount>;
    /**
     * Update enterprise account properties
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param body Object to send to the endpoint.
     */
    update(enterpriseAccountIdentity: string, body: Heroku.EnterpriseAccountUpdatePayload): Promise<Heroku.EnterpriseAccount>;
}
