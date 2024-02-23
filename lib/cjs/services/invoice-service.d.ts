import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Invoice](https://devcenter.heroku.com/articles/platform-api-reference#invoice)
 * An invoice is an itemized bill of goods for an account which includes pricing and charges.
 */
export default class InvoiceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing invoice.
     *
     * @param invoiceIdentity human readable invoice number.
     * @param requestInit The initializer for the request.
     */
    info(invoiceIdentity: number, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Invoice>;
    /**
     * List existing invoices.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Invoice[]>;
}
