/**
 Heroku Platform API - Enterprise Account Member
Enterprise account members are users with access to an enterprise account.

*/
export default class EnterpriseAccountMemberService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List members in an enterprise account.
 *
 * @param enterpriseAccountIdentity unique identifier of the enterprise account.
 */
    async list(enterpriseAccountIdentity) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountIdentity}/members`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param body Object to send to the endpoint.
     */
    async create(enterpriseAccountIdentity, body) {
        const response = await this.heroku.post(`/enterprise-accounts/${enterpriseAccountIdentity}/members`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     * @param body Object to send to the endpoint.
     */
    async update(enterpriseAccountIdentity, enterpriseAccountMemberUserIdentity, body) {
        const response = await this.heroku.patch(`/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * delete a member in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
     */
    async delete(enterpriseAccountIdentity, enterpriseAccountMemberUserIdentity) {
        const response = await this.heroku.delete(`/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
