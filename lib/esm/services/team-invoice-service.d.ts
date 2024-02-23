import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invoice](https://devcenter.heroku.com/articles/platform-api-reference#team-invoice)
 * A Team Invoice is an itemized bill of goods for a team which includes pricing and charges.
 */
export default class TeamInvoiceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing invoice.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamInvoiceIdentity human readable invoice number.
     * @param requestInit The initializer for the request.
     */
    info(teamIdentity: string, teamInvoiceIdentity: number, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamInvoice>;
    /**
     * List existing invoices.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamInvoice[]>;
}
