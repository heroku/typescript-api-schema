import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Region Capability](https://devcenter.heroku.com/articles/platform-api-reference#add-on-region-capability)
 * Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
 */
export default class AddOnRegionCapabilityService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List all existing add-on region capabilities.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnRegionCapability[]>;
    /**
     * List existing add-on region capabilities for an add-on-service
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    listByAddOnService(addOnServiceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnRegionCapability[]>;
    /**
     * List existing add-on region capabilities for a region.
     *
     * @param regionIdentity unique identifier of region or unique name of region.
     * @param requestInit The initializer for the request.
     */
    listByRegion(regionIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnRegionCapability[]>;
}
