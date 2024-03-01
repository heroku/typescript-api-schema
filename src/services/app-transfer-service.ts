import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Transfer](https://devcenter.heroku.com/articles/platform-api-reference#app-transfer)
 * An app transfer represents a two party interaction for transferring ownership of an app.
 */
export default class AppTransferService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new app transfer.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.AppTransferCreatePayload): Promise<Heroku.AppTransfer> {
    const response = await this.heroku.post<Heroku.AppTransfer>(`/account/app-transfers`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing app transfer
   *
   * @param appTransferIdentity unique identifier of app transfer or unique name of app.
   */
  public async delete(appTransferIdentity: string): Promise<Heroku.AppTransfer> {
    const response = await this.heroku.delete<Heroku.AppTransfer>(`/account/app-transfers/${appTransferIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing app transfer.
   *
   * @param appTransferIdentity unique identifier of app transfer or unique name of app.
   */
  public async info(appTransferIdentity: string): Promise<Heroku.AppTransfer> {
    const response = await this.heroku.get<Heroku.AppTransfer>(`/account/app-transfers/${appTransferIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing apps transfers.
   *
   */
  public async list(): Promise<Heroku.AppTransfer[]> {
    const response = await this.heroku.get<Heroku.AppTransfer[]>(`/account/app-transfers`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an existing app transfer.
   *
   * @param appTransferIdentity unique identifier of app transfer or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async update(appTransferIdentity: string, body: Heroku.AppTransferUpdatePayload): Promise<Heroku.AppTransfer> {
    const response = await this.heroku.patch<Heroku.AppTransfer>(`/account/app-transfers/${appTransferIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
