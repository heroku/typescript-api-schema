import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook)
* Represents the details of a webhook subscription
*/
export default class AppWebhookService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create an app webhook subscription.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.AppWebhookCreatePayload): Promise<Heroku.AppWebhook>;
    /**
     * Removes an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    delete(appIdentity: string, appWebhookIdentity: string): Promise<Heroku.AppWebhook>;
    /**
     * Returns the info for an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    info(appIdentity: string, appWebhookIdentity: string): Promise<Heroku.AppWebhook>;
    /**
     * List all webhook subscriptions for a particular app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.AppWebhook[]>;
    /**
     * Updates the details of an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, appWebhookIdentity: string, body: Heroku.AppWebhookUpdatePayload): Promise<Heroku.AppWebhook>;
}
