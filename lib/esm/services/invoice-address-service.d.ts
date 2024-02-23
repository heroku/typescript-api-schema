import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Invoice Address](https://devcenter.heroku.com/articles/platform-api-reference#invoice-address)
 * An invoice address represents the address that should be listed on an invoice.
 */
export default class InvoiceAddressService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Retrieve existing invoice address.
     *
     * @param requestInit The initializer for the request.
     */
    info(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.InvoiceAddress>;
    /**
     * Update invoice address for an account.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(payload: Heroku.InvoiceAddressUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.InvoiceAddress>;
}
