import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invoice](https://devcenter.heroku.com/articles/platform-api-reference#team-invoice)
 * A Team Invoice is an itemized bill of goods for a team which includes pricing and charges.
 */
export default class TeamInvoiceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing invoice.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamInvoiceIdentity human readable invoice number.
   */
  public async info(teamIdentity: string, teamInvoiceIdentity: number): Promise<Heroku.TeamInvoice> {
    const response = await this.heroku.get<Heroku.TeamInvoice>(
      `/teams/${teamIdentity}/invoices/${teamInvoiceIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing invoices.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async list(teamIdentity: string): Promise<Heroku.TeamInvoice[]> {
    const response = await this.heroku.get<Heroku.TeamInvoice[]>(`/teams/${teamIdentity}/invoices`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
