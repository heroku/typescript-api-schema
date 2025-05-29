"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Vault API - Payment Method](https://devcenter.heroku.com/articles/platform-api-reference#payment-method)
 * The on file payment method for an account
 */
class PaymentMethodService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Update an existing payment method for an account.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/payment-method`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
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
    /**
     * Get the current payment method for an account.
     *
     * @param requestInit The initializer for the request.
     */
    async get(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/payment-method`, {
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
     * Get the verified apps on the payment-method
     *
     * @param requestInit The initializer for the request.
     */
    async getApps(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/payment-method/apps`, {
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
}
exports.default = PaymentMethodService;
