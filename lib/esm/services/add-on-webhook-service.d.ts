import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook)
 * Represents the details of a webhook subscription
 */
export default class AddOnWebhookService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(addOnIdentity: string, payload: Heroku.AddOnWebhookCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddonWebhook>;
    /**
     * Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param requestInit The initializer for the request.
     */
    delete(addOnIdentity: string, appWebhookIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddonWebhook>;
    /**
     * Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param requestInit The initializer for the request.
     */
    info(addOnIdentity: string, appWebhookIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddonWebhook>;
    /**
     * List all webhook subscriptions for a particular add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    list(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddonWebhook[]>;
    /**
     * Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(addOnIdentity: string, appWebhookIdentity: string, payload: Heroku.AddOnWebhookUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddonWebhook>;
}
