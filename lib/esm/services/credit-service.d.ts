import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Credit](https://devcenter.heroku.com/articles/platform-api-reference#credit)
 * A credit represents value that will be used up before further charges are assigned to an account.
 */
export default class CreditService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new credit.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.CreditCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Credit>;
    /**
     * Info for existing credit.
     *
     * @param creditIdentity unique identifier of credit.
     * @param requestInit The initializer for the request.
     */
    info(creditIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Credit>;
    /**
     * List existing credits.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Credit[]>;
}
