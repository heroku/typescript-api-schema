/**
 Heroku Platform API - Account
An account represents an individual signed up to use the Heroku platform.

*/
export default class AccountService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for account.
 *
 */
    async info() {
        const response = await this.heroku.get(`/account`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update account.
     *
     * @param body Object to send to the endpoint.
     */
    async update(body) {
        const response = await this.heroku.patch(`/account`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     */
    async delete() {
        const response = await this.heroku.delete(`/account`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    async infoByUser(accountIdentity) {
        const response = await this.heroku.get(`/users/${accountIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param body Object to send to the endpoint.
     */
    async updateByUser(accountIdentity, body) {
        const response = await this.heroku.patch(`/users/${accountIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    async deleteByUser(accountIdentity) {
        const response = await this.heroku.delete(`/users/${accountIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
