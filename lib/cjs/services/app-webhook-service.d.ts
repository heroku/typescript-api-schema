import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook)
 * Represents the details of a webhook subscription
 */
export default class AppWebhookService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.AppWebhookCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhook>;
    /**
     * Removes an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, appWebhookIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhook>;
    /**
     * Returns the info for an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, appWebhookIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhook>;
    /**
     * List all webhook subscriptions for a particular app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhook[]>;
    /**
     * Updates the details of an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, appWebhookIdentity: string, payload: Heroku.AppWebhookUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhook>;
}
