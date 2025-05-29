import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Vault API - Payments](https://devcenter.heroku.com/articles/platform-api-reference#payment)
 * A payment represents money collected for an account
 */
export default class PaymentService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a payment on an existing account
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.PaymentCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Payment>;
    /**
     * Create a payment on an existing team
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    createPayment(teamIdentity: string, payload: Heroku.PaymentCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Payment>;
}
