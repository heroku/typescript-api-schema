/**
 * [Heroku Platform API - Team Delinquency](https://devcenter.heroku.com/articles/platform-api-reference#team-delinquency)
 * A Heroku team becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent teams if their invoices remain unpaid.
 */
export default class TeamDelinquencyService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Team delinquency information.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async info(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/delinquency`, {
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
