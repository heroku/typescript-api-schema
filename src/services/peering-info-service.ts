import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering Info](https://devcenter.heroku.com/articles/platform-api-reference#peering-info)
 * [Peering Info](https://devcenter.heroku.com/articles/private-space-peering) gives you the information necessary to peer an AWS VPC to a Private Space.
 */
export default class PeeringInfoService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Provides the necessary information to establish an AWS VPC Peering with your private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async info(spaceIdentity: string): Promise<Heroku.PeeringInfo> {
    const response = await this.heroku.get<Heroku.PeeringInfo>(`/spaces/${spaceIdentity}/peering-info`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
