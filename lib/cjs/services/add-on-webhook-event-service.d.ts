import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-event)
 * Represents a webhook event that occurred.
 */
export default class AddOnWebhookEventService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Returns the info for a specified webhook event.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookEventIdentity the event's unique identifier.
     * @param requestInit The initializer for the request.
     */
    info(addOnIdentity: string, appWebhookEventIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookEvent>;
    /**
     * Lists existing webhook events for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    list(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookEvent[]>;
}
