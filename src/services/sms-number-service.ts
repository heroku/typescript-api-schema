import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SMS Number](https://devcenter.heroku.com/articles/platform-api-reference#sms-number)
 * SMS numbers are used for recovery on accounts with two-factor authentication enabled.
 */
export default class SmsNumberService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Recover an account using an SMS recovery code
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   */
  public async smsNumber(accountIdentity: string): Promise<Heroku.SmsNumber> {
    const response = await this.heroku.get<Heroku.SmsNumber>(`/users/${accountIdentity}/sms-number`, {
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
  public async recover(accountIdentity: string): Promise<Heroku.SmsNumber> {
    const response = await this.heroku.post<Heroku.SmsNumber>(`/users/${accountIdentity}/sms-number/actions/recover`, {
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
  public async confirm(accountIdentity: string): Promise<Heroku.SmsNumber> {
    const response = await this.heroku.post<Heroku.SmsNumber>(`/users/${accountIdentity}/sms-number/actions/confirm`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
