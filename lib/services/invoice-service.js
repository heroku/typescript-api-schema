/**
 Heroku Platform API - Invoice
An invoice is an itemized bill of goods for an account which includes pricing and charges.

*/
export default class InvoiceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing invoice.
 *
 * @param invoiceIdentity human readable invoice number.
 */
    async info(invoiceIdentity) {
        const response = await this.heroku.get(`/account/invoices/${invoiceIdentity}`, {
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
    async list() {
        const response = await this.heroku.get(`/account/invoices`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
