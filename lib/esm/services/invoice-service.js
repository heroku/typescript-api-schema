/**
 * [Heroku Platform API - Invoice](https://devcenter.heroku.com/articles/platform-api-reference#invoice)
 * An invoice is an itemized bill of goods for an account which includes pricing and charges.
 */
export default class InvoiceService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for existing invoice.
     *
     * @param invoiceIdentity human readable invoice number.
     * @param requestInit The initializer for the request.
     */
    async info(invoiceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/invoices/${invoiceIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * List existing invoices.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/invoices`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
