import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account](https://devcenter.heroku.com/articles/platform-api-reference#account)
 * An account represents an individual signed up to use the Heroku platform.
 */
export default class AccountService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for account.
     *
     * @param requestInit The initializer for the request.
     */
    info(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Account>;
    /**
     * Update account.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(payload: Heroku.AccountUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Account>;
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     * @param requestInit The initializer for the request.
     */
    delete(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Account>;
    /**
     * Info for account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    infoByUser(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Account>;
    /**
     * Update account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    updateByUser(accountIdentity: string, payload: Heroku.AccountUpdateByUserPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Account>;
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    deleteByUser(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Account>;
}
