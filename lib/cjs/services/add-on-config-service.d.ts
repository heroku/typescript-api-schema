import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Config](https://devcenter.heroku.com/articles/platform-api-reference#add-on-config)
 * Configuration of an Add-on
 */
export default class AddOnConfigService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Get an add-on's config. Accessible by customers with access and by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    list(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnConfig[]>;
    /**
     * Update an add-on's config. Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(addOnIdentity: string, payload: Heroku.AddOnConfigUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnConfig[]>;
}
