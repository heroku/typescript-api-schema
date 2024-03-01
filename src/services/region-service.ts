import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Region](https://devcenter.heroku.com/articles/platform-api-reference#region)
 * A region represents a geographic location in which your application may run.
 */
export default class RegionService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing region.
   *
   * @param regionIdentity unique identifier of region or unique name of region.
   */
  public async info(regionIdentity: string): Promise<Heroku.Region> {
    const response = await this.heroku.get<Heroku.Region>(`/regions/${regionIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing regions.
   *
   */
  public async list(): Promise<Heroku.Region[]> {
    const response = await this.heroku.get<Heroku.Region[]>(`/regions`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
