import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invoice](https://devcenter.heroku.com/articles/platform-api-reference#team-invoice)
* A Team Invoice is an itemized bill of goods for a team which includes pricing and charges.
*/
export default class TeamInvoiceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing invoice.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 * @param teamInvoiceIdentity human readable invoice number.
 */
    info(teamIdentity: string, teamInvoiceIdentity: number): Promise<Heroku.TeamInvoice>;
    /**
     * List existing invoices.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    list(teamIdentity: string): Promise<Heroku.TeamInvoice[]>;
}
