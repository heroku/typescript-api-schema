import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Delinquency](https://devcenter.heroku.com/articles/platform-api-reference#team-delinquency)
 * A Heroku team becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent teams if their invoices remain unpaid.
 */
export default class TeamDelinquencyService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Team delinquency information.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    info(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamDelinquency>;
}
