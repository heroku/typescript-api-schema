import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account)
 * Enterprise accounts allow companies to manage their development teams and billing.
 */
export default class EnterpriseAccountService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * List enterprise accounts in which you are a member.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.EnterpriseAccount[]> {
    const response = await this.fetchImpl(`/enterprise-accounts`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccount[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Information about an enterprise account.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param requestInit The initializer for the request.
   */
  public async info(
    enterpriseAccountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccount> {
    const response = await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccount>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update enterprise account properties
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    enterpriseAccountIdentity: string,
    payload: Heroku.EnterpriseAccountUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccount> {
    const response = await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccount>;
    }
    throw new Error(response.statusText);
  }
}