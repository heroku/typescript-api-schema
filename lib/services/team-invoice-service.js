/**
 Heroku Platform API - Team Invoice
A Team Invoice is an itemized bill of goods for a team which includes pricing and charges.

*/
export default class TeamInvoiceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing invoice.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 * @param teamInvoiceIdentity human readable invoice number.
 */
    async info(teamIdentity, teamInvoiceIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/invoices/${teamInvoiceIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing invoices.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    async list(teamIdentity) {
        const response = await this.heroku.get(`/teams/${teamIdentity}/invoices`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
