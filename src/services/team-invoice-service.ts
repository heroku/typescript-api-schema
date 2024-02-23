import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invoice](https://devcenter.heroku.com/articles/platform-api-reference#team-invoice)
 * A Team Invoice is an itemized bill of goods for a team which includes pricing and charges.
 */
export default class TeamInvoiceService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing invoice.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamInvoiceIdentity human readable invoice number.
   * @param requestInit The initializer for the request.
   */
  public async info(
    teamIdentity: string,
    teamInvoiceIdentity: number,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamInvoice> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/invoices/${teamInvoiceIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvoice>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing invoices.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamInvoice[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/invoices`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamInvoice[]>;
    }
    throw new Error(response.statusText);
  }
}
