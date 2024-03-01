/**
 Heroku Vault API - Invoice Address
An invoice address represents the address that should be listed on an invoice.

*/
export default class InvoiceAddressService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieve existing invoice address.
 *
 */
    async info() {
        const response = await this.heroku.get(`/account/invoice-address`, {
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
    async update(body) {
        const response = await this.heroku.put(`/account/invoice-address`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
