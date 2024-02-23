import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account Monthly Usage](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-monthly-usage)
 * Usage for an enterprise account at a monthly resolution.
 */
export default class EnterpriseAccountMonthlyUsageService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Retrieves usage for an enterprise account for a range of months. Start and end dates can be specified as query parameters using the date format YYYY-MM. If no end date is specified, one month of usage is returned. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).
   *
   * @param enterpriseAccountId unique identifier of the enterprise account
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async info(
    enterpriseAccountId: string,
    payload: Heroku.EnterpriseAccountMonthlyUsageInfoPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.EnterpriseAccountMonthlyUsage[]> {
    const response = await this.fetchImpl(`${this.endpoint}/enterprise-accounts/${enterpriseAccountId}/usage/monthly`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.EnterpriseAccountMonthlyUsage[]>;
    }
    throw new Error(response.statusText);
  }
}
