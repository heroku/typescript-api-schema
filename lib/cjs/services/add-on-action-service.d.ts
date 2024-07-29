import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Action](https://devcenter.heroku.com/articles/platform-api-reference#add-on-action)
 * Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
 */
export default class AddOnActionService {
    protected readonly fetchImpl: typeof fetch;
    constructor(fetchImpl: typeof fetch);
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
}