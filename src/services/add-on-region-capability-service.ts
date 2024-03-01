import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Region Capability](https://devcenter.heroku.com/articles/platform-api-reference#add-on-region-capability)
 * Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
 */
export default class AddOnRegionCapabilityService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List all existing add-on region capabilities.
   *
   */
  public async list(): Promise<Heroku.AddOnRegionCapability[]> {
    const response = await this.heroku.get<Heroku.AddOnRegionCapability[]>(`/addon-region-capabilities`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing add-on region capabilities for an add-on-service
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   */
  public async listByAddOnService(addOnServiceIdentity: string): Promise<Heroku.AddOnRegionCapability[]> {
    const response = await this.heroku.get<Heroku.AddOnRegionCapability[]>(
      `/addon-services/${addOnServiceIdentity}/region-capabilities`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing add-on region capabilities for a region.
   *
   * @param regionIdentity unique identifier of region or unique name of region.
   */
  public async listByRegion(regionIdentity: string): Promise<Heroku.AddOnRegionCapability[]> {
    const response = await this.heroku.get<Heroku.AddOnRegionCapability[]>(
      `/regions/${regionIdentity}/addon-region-capabilities`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
}
