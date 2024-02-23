import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account](https://devcenter.heroku.com/articles/platform-api-reference#account)
* An account represents an individual signed up to use the Heroku platform.
*/
export default class AccountService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for account.
 *
 */
    info(): Promise<Heroku.Account>;
    /**
     * Update account.
     *
     * @param body Object to send to the endpoint.
     */
    update(body: Heroku.AccountUpdatePayload): Promise<Heroku.Account>;
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     */
    delete(): Promise<Heroku.Account>;
    /**
     * Info for account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    infoByUser(accountIdentity: string): Promise<Heroku.Account>;
    /**
     * Update account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param body Object to send to the endpoint.
     */
    updateByUser(accountIdentity: string, body: Heroku.AccountUpdateByUserPayload): Promise<Heroku.Account>;
    /**
     * Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account.
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    deleteByUser(accountIdentity: string): Promise<Heroku.Account>;
}
