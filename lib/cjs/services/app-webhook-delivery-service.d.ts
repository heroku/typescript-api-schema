import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
export default class AppWebhookDeliveryService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Returns the info for an existing delivery.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookDeliveryIdentity the delivery's unique identifier.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, appWebhookDeliveryIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookDelivery>;
    /**
     * Lists existing deliveries for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookDelivery[]>;
}
