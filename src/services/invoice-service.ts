import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Invoice](https://devcenter.heroku.com/articles/platform-api-reference#invoice)
 * An invoice is an itemized bill of goods for an account which includes pricing and charges.
 */
export default class InvoiceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing invoice.
   *
   * @param invoiceIdentity human readable invoice number.
   */
  public async info(invoiceIdentity: number): Promise<Heroku.Invoice> {
    const response = await this.heroku.get<Heroku.Invoice>(`/account/invoices/${invoiceIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing invoices.
   *
   */
  public async list(): Promise<Heroku.Invoice[]> {
    const response = await this.heroku.get<Heroku.Invoice[]>(`/account/invoices`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
