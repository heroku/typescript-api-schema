/**
 Heroku Platform API - Add-on Region Capability
Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.

*/
export default class AddOnRegionCapabilityService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List all existing add-on region capabilities.
 *
 */
    async list() {
        const response = await this.heroku.get(`/addon-region-capabilities`, {
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
    async listByAddOnService(addOnServiceIdentity) {
        const response = await this.heroku.get(`/addon-services/${addOnServiceIdentity}/region-capabilities`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing add-on region capabilities for a region.
     *
     * @param regionIdentity unique identifier of region or unique name of region.
     */
    async listByRegion(regionIdentity) {
        const response = await this.heroku.get(`/regions/${regionIdentity}/addon-region-capabilities`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
