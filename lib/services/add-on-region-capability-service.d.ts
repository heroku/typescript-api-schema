import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Region Capability](https://devcenter.heroku.com/articles/platform-api-reference#add-on-region-capability)
* Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
*/
export default class AddOnRegionCapabilityService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List all existing add-on region capabilities.
 *
 */
    list(): Promise<Heroku.AddOnRegionCapability[]>;
    /**
     * List existing add-on region capabilities for an add-on-service
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     */
    listByAddOnService(addOnServiceIdentity: string): Promise<Heroku.AddOnRegionCapability[]>;
    /**
     * List existing add-on region capabilities for a region.
     *
     * @param regionIdentity unique identifier of region or unique name of region.
     */
    listByRegion(regionIdentity: string): Promise<Heroku.AddOnRegionCapability[]>;
}
