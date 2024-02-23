import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Network Address Translation](https://devcenter.heroku.com/articles/platform-api-reference#space-nat)
 * Network address translation (NAT) for stable outbound IP addresses from a space
 */
export default class SpaceNatService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Current state of network address translation for a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async info(spaceIdentity: string): Promise<Heroku.SpaceNat> {
    const response = await this.heroku.get<Heroku.SpaceNat>(`/spaces/${spaceIdentity}/nat`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
