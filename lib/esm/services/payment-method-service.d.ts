import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Payment Method](https://devcenter.heroku.com/articles/platform-api-reference#payment-method)
 * The on file payment method for an account
 */
export default class PaymentMethodService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Update an existing payment method for an account.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(payload: Heroku.PaymentMethodUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PaymentMethod>;
    /**
     * Get the current payment method for an account.
     *
     * @param requestInit The initializer for the request.
     */
    get(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PaymentMethod>;
    /**
     * Get the verified apps on the payment-method
     *
     * @param requestInit The initializer for the request.
     */
    getApps(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App[]>;
}
