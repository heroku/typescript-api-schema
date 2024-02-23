import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Plan](https://devcenter.heroku.com/articles/platform-api-reference#plan)
* Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
*/
export default class PlanService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing plan.
 *
 * @param planIdentity unique identifier of this plan or unique name of this plan.
 */
    info(planIdentity: string): Promise<Heroku.Plan>;
    /**
     * Info for existing plan by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     */
    infoByAddOn(addOnServiceIdentity: string, planIdentity: string): Promise<Heroku.Plan>;
    /**
     * List existing plans by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     */
    listByAddOn(addOnServiceIdentity: string): Promise<Heroku.Plan[]>;
}
