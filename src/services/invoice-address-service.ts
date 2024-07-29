import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Invoice Address](https://devcenter.heroku.com/articles/platform-api-reference#invoice-address)
 * An invoice address represents the address that should be listed on an invoice.
 */
export default class InvoiceAddressService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * Retrieve existing invoice address.
   *
   * @param requestInit The initializer for the request.
   */
  public async info(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.InvoiceAddress> {
    const response = await this.fetchImpl(`/account/invoice-address`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.InvoiceAddress>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update invoice address for an account.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    payload: Heroku.InvoiceAddressUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.InvoiceAddress> {
    const response = await this.fetchImpl(`/account/invoice-address`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PUT',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.InvoiceAddress>;
    }
    throw new Error(response.statusText);
  }
}