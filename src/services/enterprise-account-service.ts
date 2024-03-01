import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account)
 * Enterprise accounts allow companies to manage their development teams and billing.
 */
export default class EnterpriseAccountService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List enterprise accounts in which you are a member.
   *
   */
  public async list(): Promise<Heroku.EnterpriseAccount[]> {
    const response = await this.heroku.get<Heroku.EnterpriseAccount[]>(`/enterprise-accounts`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Information about an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   */
  public async info(enterpriseAccountIdentity: string): Promise<Heroku.EnterpriseAccount> {
    const response = await this.heroku.get<Heroku.EnterpriseAccount>(
      `/enterprise-accounts/${enterpriseAccountIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Update enterprise account properties
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   * @param body Object to send to the endpoint.
   */
  public async update(
    enterpriseAccountIdentity: string,
    body: Heroku.EnterpriseAccountUpdatePayload
  ): Promise<Heroku.EnterpriseAccount> {
    const response = await this.heroku.patch<Heroku.EnterpriseAccount>(
      `/enterprise-accounts/${enterpriseAccountIdentity}`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
