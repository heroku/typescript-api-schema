import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Credit](https://devcenter.heroku.com/articles/platform-api-reference#credit)
 * A credit represents value that will be used up before further charges are assigned to an account.
 */
export default class CreditService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new credit.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.CreditCreatePayload): Promise<Heroku.Credit> {
    const response = await this.heroku.post<Heroku.Credit>(`/account/credits`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing credit.
   *
   * @param creditIdentity unique identifier of credit.
   */
  public async info(creditIdentity: string): Promise<Heroku.Credit> {
    const response = await this.heroku.get<Heroku.Credit>(`/account/credits/${creditIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing credits.
   *
   */
  public async list(): Promise<Heroku.Credit[]> {
    const response = await this.heroku.get<Heroku.Credit[]>(`/account/credits`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
