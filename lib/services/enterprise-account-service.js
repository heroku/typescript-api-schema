/**
 Heroku Platform API - Enterprise Account
Enterprise accounts allow companies to manage their development teams and billing.

*/
export default class EnterpriseAccountService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List enterprise accounts in which you are a member.
 *
 */
    async list() {
        const response = await this.heroku.get(`/enterprise-accounts`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Information about an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     */
    async info(enterpriseAccountIdentity) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update enterprise account properties
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param body Object to send to the endpoint.
     */
    async update(enterpriseAccountIdentity, body) {
        const response = await this.heroku.patch(`/enterprise-accounts/${enterpriseAccountIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
