"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Vault API - Invoice Address](https://devcenter.heroku.com/articles/platform-api-reference#invoice-address)
 * An invoice address represents the address that should be listed on an invoice.
 */
class InvoiceAddressService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Retrieve existing invoice address.
     *
     * @param requestInit The initializer for the request.
     */
    async info(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/invoice-address`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Update invoice address for an account.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/invoice-address`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PUT',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = InvoiceAddressService;
