import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account](https://devcenter.heroku.com/articles/platform-api-reference#account)
 * An account represents an individual signed up to use the Heroku platform.
 */
export default class AccountService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for account.
   *
   */
  public async info(): Promise<Heroku.Account> {
    const response = await this.heroku.get<Heroku.Account>(`/account`, {
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
  public async update(body: Heroku.AccountUpdatePayload): Promise<Heroku.Account> {
    const response = await this.heroku.patch<Heroku.Account>(`/account`, {
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
  public async delete(): Promise<Heroku.Account> {
    const response = await this.heroku.delete<Heroku.Account>(`/account`, {
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
  public async infoByUser(accountIdentity: string): Promise<Heroku.Account> {
    const response = await this.heroku.get<Heroku.Account>(`/users/${accountIdentity}`, {
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
  public async updateByUser(accountIdentity: string, body: Heroku.AccountUpdateByUserPayload): Promise<Heroku.Account> {
    const response = await this.heroku.patch<Heroku.Account>(`/users/${accountIdentity}`, {
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
  public async deleteByUser(accountIdentity: string): Promise<Heroku.Account> {
    const response = await this.heroku.delete<Heroku.Account>(`/users/${accountIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
