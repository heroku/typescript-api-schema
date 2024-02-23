import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Plan](https://devcenter.heroku.com/articles/platform-api-reference#plan)
 * Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class PlanService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing plan.
     *
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     * @param requestInit The initializer for the request.
     */
    info(planIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Plan>;
    /**
     * Info for existing plan by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     * @param requestInit The initializer for the request.
     */
    infoByAddOn(addOnServiceIdentity: string, planIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Plan>;
    /**
     * List existing plans by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    listByAddOn(addOnServiceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Plan[]>;
}
