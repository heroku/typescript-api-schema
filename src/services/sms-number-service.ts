import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SMS Number](https://devcenter.heroku.com/articles/platform-api-reference#sms-number)
 * SMS numbers are used for recovery on accounts with two-factor authentication enabled.
 */
export default class SmsNumberService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Recover an account using an SMS recovery code
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async smsNumber(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SmsNumber> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/sms-number`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SmsNumber>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Recover an account using an SMS recovery code
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async recover(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SmsNumber> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/sms-number/actions/recover`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SmsNumber>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Confirm an SMS number change with a confirmation code
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param requestInit The initializer for the request.
   */
  public async confirm(
    accountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SmsNumber> {
    const response = await this.fetchImpl(`${this.endpoint}/users/${accountIdentity}/sms-number/actions/confirm`, {
      ...requestInit,

      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SmsNumber>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
