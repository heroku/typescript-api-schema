/**
 Heroku Platform API - SMS Number
SMS numbers are used for recovery on accounts with two-factor authentication enabled.

*/
export default class SmsNumberService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Recover an account using an SMS recovery code
 *
 * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
 */
    async smsNumber(accountIdentity) {
        const response = await this.heroku.get(`/users/${accountIdentity}/sms-number`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Recover an account using an SMS recovery code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    async recover(accountIdentity) {
        const response = await this.heroku.post(`/users/${accountIdentity}/sms-number/actions/recover`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Confirm an SMS number change with a confirmation code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    async confirm(accountIdentity) {
        const response = await this.heroku.post(`/users/${accountIdentity}/sms-number/actions/confirm`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
