import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-event)
* Represents a webhook event that occurred.
*/
export default class AppWebhookEventService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Returns the info for a specified webhook event.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param appWebhookEventIdentity the event's unique identifier.
 */
    info(appIdentity: string, appWebhookEventIdentity: string): Promise<Heroku.AppWebhookEvent>;
    /**
     * Lists existing webhook events for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.AppWebhookEvent[]>;
}
