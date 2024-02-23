import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#add-on-service)
 * Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class AddOnServiceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing add-on-service.
     *
     * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    info(addOnServiceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnService>;
    /**
     * List existing add-on-services.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnService[]>;
}
