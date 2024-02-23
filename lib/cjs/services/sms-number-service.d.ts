import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SMS Number](https://devcenter.heroku.com/articles/platform-api-reference#sms-number)
 * SMS numbers are used for recovery on accounts with two-factor authentication enabled.
 */
export default class SmsNumberService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Recover an account using an SMS recovery code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    smsNumber(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SmsNumber>;
    /**
     * Recover an account using an SMS recovery code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    recover(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SmsNumber>;
    /**
     * Confirm an SMS number change with a confirmation code
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    confirm(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SmsNumber>;
}
