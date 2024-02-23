import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-event)
 * Represents a webhook event that occurred.
 */
export default class AppWebhookEventService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Returns the info for a specified webhook event.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookEventIdentity the event's unique identifier.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, appWebhookEventIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookEvent>;
    /**
     * Lists existing webhook events for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppWebhookEvent[]>;
}
