import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account Member](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-member)
 * Enterprise account members are users with access to an enterprise account.
 */
export default class EnterpriseAccountMemberService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List members in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   */
  public async list(enterpriseAccountIdentity: string): Promise<Heroku.EnterpriseAccountMember[]> {
    const response = await this.heroku.get<Heroku.EnterpriseAccountMember[]>(
      `/enterprise-accounts/${enterpriseAccountIdentity}/members`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Create a member in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   * @param body Object to send to the endpoint.
   */
  public async create(
    enterpriseAccountIdentity: string,
    body: Heroku.EnterpriseAccountMemberCreatePayload
  ): Promise<Heroku.EnterpriseAccountMember> {
    const response = await this.heroku.post<Heroku.EnterpriseAccountMember>(
      `/enterprise-accounts/${enterpriseAccountIdentity}/members`,
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
  /**
   * Update a member in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
   * @param body Object to send to the endpoint.
   */
  public async update(
    enterpriseAccountIdentity: string,
    enterpriseAccountMemberUserIdentity: string,
    body: Heroku.EnterpriseAccountMemberUpdatePayload
  ): Promise<Heroku.EnterpriseAccountMember> {
    const response = await this.heroku.patch<Heroku.EnterpriseAccountMember>(
      `/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`,
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
  /**
   * delete a member in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
   */
  public async delete(
    enterpriseAccountIdentity: string,
    enterpriseAccountMemberUserIdentity: string
  ): Promise<Heroku.EnterpriseAccountMember> {
    const response = await this.heroku.delete<Heroku.EnterpriseAccountMember>(
      `/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
