import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Payment Method](https://devcenter.heroku.com/articles/platform-api-reference#payment-method)
 * The on file payment method for an account
 */
export default class PaymentMethodService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Update an existing payment method for an account.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    payload: Heroku.PaymentMethodUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PaymentMethod> {
    const response = await this.fetchImpl(`${this.endpoint}/account/payment-method`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PaymentMethod>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Get the current payment method for an account.
   *
   * @param requestInit The initializer for the request.
   */
  public async get(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.PaymentMethod> {
    const response = await this.fetchImpl(`${this.endpoint}/account/payment-method`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PaymentMethod>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Get the verified apps on the payment-method
   *
   * @param requestInit The initializer for the request.
   */
  public async getApps(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.App[]> {
    const response = await this.fetchImpl(`${this.endpoint}/account/payment-method/apps`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.App[]>;
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
