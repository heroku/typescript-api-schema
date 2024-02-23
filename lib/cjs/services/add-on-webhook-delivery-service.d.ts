import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
export default class AddOnWebhookDeliveryService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Returns the info for an existing delivery.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookDeliveryIdentity the delivery's unique identifier.
     * @param requestInit The initializer for the request.
     */
    info(addOnIdentity: string, appWebhookDeliveryIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookDelivery>;
    /**
     * Lists existing deliveries for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    list(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookDelivery[]>;
}
