import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Invoice Address](https://devcenter.heroku.com/articles/platform-api-reference#invoice-address)
 * An invoice address represents the address that should be listed on an invoice.
 */
export default class InvoiceAddressService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Retrieve existing invoice address.
   *
   */
  public async info(): Promise<Heroku.InvoiceAddress> {
    const response = await this.heroku.get<Heroku.InvoiceAddress>(`/account/invoice-address`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update invoice address for an account.
   *
   * @param body Object to send to the endpoint.
   */
  public async update(body: Heroku.InvoiceAddressUpdatePayload): Promise<Heroku.InvoiceAddress> {
    const response = await this.heroku.put<Heroku.InvoiceAddress>(`/account/invoice-address`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
