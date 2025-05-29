/**
 * [Heroku Platform API - Account Delinquency](https://devcenter.heroku.com/articles/platform-api-reference#account-delinquency)
 * A Heroku account becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent accounts if their invoices remain unpaid.
 */
export default class AccountDelinquencyService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Account delinquency information.
     *
     * @param requestInit The initializer for the request.
     */
    async info(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/delinquency`, {
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
