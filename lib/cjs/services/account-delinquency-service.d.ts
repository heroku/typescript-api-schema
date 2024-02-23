import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account Delinquency](https://devcenter.heroku.com/articles/platform-api-reference#account-delinquency)
 * A Heroku account becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent accounts if their invoices remain unpaid.
 */
export default class AccountDelinquencyService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Account delinquency information.
     *
     * @param requestInit The initializer for the request.
     */
    info(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AccountDelinquency>;
}
