import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account Delinquency](https://devcenter.heroku.com/articles/platform-api-reference#account-delinquency)
 * A Heroku account becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent accounts if their invoices remain unpaid.
 */
export default class AccountDelinquencyService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Account delinquency information.
   *
   * @param requestInit The initializer for the request.
   */
  public async info(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AccountDelinquency> {
    const response = await this.fetchImpl(`${this.endpoint}/account/delinquency`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AccountDelinquency>;
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
