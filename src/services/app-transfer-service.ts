import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Transfer](https://devcenter.heroku.com/articles/platform-api-reference#app-transfer)
 * An app transfer represents a two party interaction for transferring ownership of an app.
 */
export default class AppTransferService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new app transfer.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.AppTransferCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppTransfer> {
    const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers`, {
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
      return (await response.json()) as Promise<Heroku.AppTransfer>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing app transfer
   *
   * @param appTransferIdentity unique identifier of app transfer or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appTransferIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppTransfer> {
    const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers/${appTransferIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppTransfer>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing app transfer.
   *
   * @param appTransferIdentity unique identifier of app transfer or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appTransferIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppTransfer> {
    const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers/${appTransferIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppTransfer>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing apps transfers.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AppTransfer[]> {
    const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppTransfer[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update an existing app transfer.
   *
   * @param appTransferIdentity unique identifier of app transfer or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appTransferIdentity: string,
    payload: Heroku.AppTransferUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppTransfer> {
    const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers/${appTransferIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppTransfer>;
    }
    throw new Error(response.statusText);
  }
}
