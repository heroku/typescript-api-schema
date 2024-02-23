import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Invoice](https://devcenter.heroku.com/articles/platform-api-reference#invoice)
* An invoice is an itemized bill of goods for an account which includes pricing and charges.
*/
export default class InvoiceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing invoice.
 *
 * @param invoiceIdentity human readable invoice number.
 */
    info(invoiceIdentity: number): Promise<Heroku.Invoice>;
    /**
     * List existing invoices.
     *
     */
    list(): Promise<Heroku.Invoice[]>;
}
