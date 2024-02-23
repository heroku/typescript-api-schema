import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on](https://devcenter.heroku.com/articles/platform-api-reference#add-on)
 * Add-ons represent add-ons that have been provisioned and attached to one or more apps.
 */
export default class AddOnService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List all existing add-ons.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn[]>;
    /**
     * Info for an existing add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    info(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * Create a new add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.AddOnCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * Delete an existing add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * Info for an existing add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    infoByApp(appIdentity: string, addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * List existing add-ons for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    listByApp(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn[]>;
    /**
     * Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, addOnIdentity: string, payload: Heroku.AddOnUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * List all existing add-ons a user has access to
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    listByUser(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn[]>;
    /**
     * List add-ons used across all Team apps
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    listByTeam(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn[]>;
    /**
     * Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    resolution(payload: Heroku.AddOnResolutionPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn[]>;
}
