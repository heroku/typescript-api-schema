"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Plan](https://devcenter.heroku.com/articles/platform-api-reference#plan)
 * Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
 */
class PlanService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Info for existing plan.
     *
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     * @param requestInit The initializer for the request.
     */
    async info(planIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/plans/${planIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Info for existing plan by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     * @param requestInit The initializer for the request.
     */
    async infoByAddOn(addOnServiceIdentity, planIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/addon-services/${addOnServiceIdentity}/plans/${planIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * List existing plans by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    async listByAddOn(addOnServiceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/addon-services/${addOnServiceIdentity}/plans`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
exports.default = PlanService;