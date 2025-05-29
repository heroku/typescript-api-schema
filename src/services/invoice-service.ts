import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Invoice](https://devcenter.heroku.com/articles/platform-api-reference#invoice)
 * An invoice is an itemized bill of goods for an account which includes pricing and charges.
 */
export default class InvoiceService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing invoice.
   *
   * @param invoiceIdentity human readable invoice number.
   * @param requestInit The initializer for the request.
   */
  public async info(
    invoiceIdentity: number,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Invoice> {
    const response = await this.fetchImpl(`${this.endpoint}/account/invoices/${invoiceIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Invoice>;
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
   * List existing invoices.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Invoice[]> {
    const response = await this.fetchImpl(`${this.endpoint}/account/invoices`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Invoice[]>;
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
