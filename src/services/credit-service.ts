import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Credit](https://devcenter.heroku.com/articles/platform-api-reference#credit)
 * A credit represents value that will be used up before further charges are assigned to an account.
 */
export default class CreditService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new credit.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.CreditCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Credit> {
    const response = await this.fetchImpl(`${this.endpoint}/account/credits`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Credit>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing credit.
   *
   * @param creditIdentity unique identifier of credit.
   * @param requestInit The initializer for the request.
   */
  public async info(
    creditIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Credit> {
    const response = await this.fetchImpl(`${this.endpoint}/account/credits/${creditIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Credit>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing credits.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Credit[]> {
    const response = await this.fetchImpl(`${this.endpoint}/account/credits`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Credit[]>;
    }
    throw new Error(response.statusText);
  }
}
