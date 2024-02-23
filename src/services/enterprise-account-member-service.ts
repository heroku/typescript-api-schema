import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account Member](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-member)
 * Enterprise account members are users with access to an enterprise account.
 */
export default class EnterpriseAccountMemberService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List members in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param requestInit The initializer for the request.
   */
  public async list(
    enterpriseAccountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccountMember[]> {
    const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccountMember[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a member in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    enterpriseAccountIdentity: string,
    payload: Heroku.EnterpriseAccountMemberCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccountMember> {
    const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccountMember>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update a member in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    enterpriseAccountIdentity: string,
    enterpriseAccountMemberUserIdentity: string,
    payload: Heroku.EnterpriseAccountMemberUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccountMember> {
    const response = await this.fetchImpl(
      `${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'PATCH',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccountMember>;
    }
    throw new Error(response.statusText);
  }
  /**
   * delete a member in an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param enterpriseAccountMemberUserIdentity unique email address of account or unique identifier of an account.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    enterpriseAccountIdentity: string,
    enterpriseAccountMemberUserIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccountMember> {
    const response = await this.fetchImpl(
      `${this.endpoint}/enterprise-accounts/${enterpriseAccountIdentity}/members/${enterpriseAccountMemberUserIdentity}`,
      {
        ...requestInit,

        method: 'DELETE',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccountMember>;
    }
    throw new Error(response.statusText);
  }
}
