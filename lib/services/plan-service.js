/**
 Heroku Platform API - Plan
Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.

*/
export default class PlanService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing plan.
 *
 * @param planIdentity unique identifier of this plan or unique name of this plan.
 */
    async info(planIdentity) {
        const response = await this.heroku.get(`/plans/${planIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info for existing plan by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     */
    async infoByAddOn(addOnServiceIdentity, planIdentity) {
        const response = await this.heroku.get(`/addon-services/${addOnServiceIdentity}/plans/${planIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing plans by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     */
    async listByAddOn(addOnServiceIdentity) {
        const response = await this.heroku.get(`/addon-services/${addOnServiceIdentity}/plans`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
