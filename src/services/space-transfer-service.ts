import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Transfer](https://devcenter.heroku.com/articles/platform-api-reference#space-transfer)
 * Transfer spaces between enterprise teams with the same Enterprise Account.
 */
export default class SpaceTransferService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Transfer space between enterprise teams
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param body Object to send to the endpoint.
   */
  public async transfer(spaceIdentity: string, body: Heroku.SpaceTransferTransferPayload): Promise<Heroku.Space> {
    const response = await this.heroku.post<Heroku.Space>(`/spaces/${spaceIdentity}/transfer`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
