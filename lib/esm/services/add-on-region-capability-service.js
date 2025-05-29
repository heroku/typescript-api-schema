/**
 * [Heroku Platform API - Add-on Region Capability](https://devcenter.heroku.com/articles/platform-api-reference#add-on-region-capability)
 * Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
 */
export default class AddOnRegionCapabilityService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List all existing add-on region capabilities.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addon-region-capabilities`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * List existing add-on region capabilities for an add-on-service
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    async listByAddOnService(addOnServiceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addon-services/${addOnServiceIdentity}/region-capabilities`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * List existing add-on region capabilities for a region.
     *
     * @param regionIdentity unique identifier of region or unique name of region.
     * @param requestInit The initializer for the request.
     */
    async listByRegion(regionIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/regions/${regionIdentity}/addon-region-capabilities`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
