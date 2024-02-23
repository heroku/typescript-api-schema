import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Topology](https://devcenter.heroku.com/articles/platform-api-reference#space-topology)
 * Space Topology provides you with a mechanism for viewing all the running dynos, formations and applications for a space. This is the same data thats used to power our DNS Service Discovery.
 */
export default class SpaceTopologyService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Current space topology
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async topology(spaceIdentity: string): Promise<Heroku.SpaceTopology> {
    const response = await this.heroku.get<Heroku.SpaceTopology>(`/spaces/${spaceIdentity}/topology`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
