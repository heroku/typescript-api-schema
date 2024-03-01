import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SMS Number](https://devcenter.heroku.com/articles/platform-api-reference#sms-number)
* SMS numbers are used for recovery on accounts with two-factor authentication enabled.
*/
export default class SmsNumberService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Recover an account using an SMS recovery code
 *
 * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
 */
    smsNumber(accountIdentity: string): Promise<Heroku.SmsNumber>;
    /**
     * Recover an account using an SMS recovery code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    recover(accountIdentity: string): Promise<Heroku.SmsNumber>;
    /**
     * Confirm an SMS number change with a confirmation code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    confirm(accountIdentity: string): Promise<Heroku.SmsNumber>;
}
