/**
 * [Heroku Platform API - Plan](https://devcenter.heroku.com/articles/platform-api-reference#plan)
 * Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class PlanService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for existing plan.
     *
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     * @param requestInit The initializer for the request.
     */
    async info(planIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/plans/${planIdentity}`, {
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
     * Info for existing plan by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param planIdentity unique identifier of this plan or unique name of this plan.
     * @param requestInit The initializer for the request.
     */
    async infoByAddOn(addOnServiceIdentity, planIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addon-services/${addOnServiceIdentity}/plans/${planIdentity}`, {
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
     * List existing plans by Add-on.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    async listByAddOn(addOnServiceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addon-services/${addOnServiceIdentity}/plans`, {
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
