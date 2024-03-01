import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Invoice Address](https://devcenter.heroku.com/articles/platform-api-reference#invoice-address)
* An invoice address represents the address that should be listed on an invoice.
*/
export default class InvoiceAddressService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Retrieve existing invoice address.
 *
 */
    info(): Promise<Heroku.InvoiceAddress>;
    /**
     * Update invoice address for an account.
     *
     * @param body Object to send to the endpoint.
     */
    update(body: Heroku.InvoiceAddressUpdatePayload): Promise<Heroku.InvoiceAddress>;
}
