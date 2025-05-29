import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Action](https://devcenter.heroku.com/articles/platform-api-reference#add-on-action)
 * Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
 */
export default class AddOnActionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Mark an add-on as provisioned for use.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    provision(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * Mark an add-on as deprovisioned.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    deprovision(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn>;
    /**
     * Add or update a peering connection to an add-on
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    peer(addOnIdentity: string, payload: Heroku.AddOnActionPeerPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Remove a peering connection from an add-on
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    unpeer(addOnIdentity: string, payload: Record<string, unknown>, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
}
