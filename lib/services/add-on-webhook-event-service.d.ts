import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-event)
* Represents a webhook event that occurred.
*/
export default class AddOnWebhookEventService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Returns the info for a specified webhook event.  Can only be accessed by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 * @param appWebhookEventIdentity the event's unique identifier.
 */
    info(addOnIdentity: string, appWebhookEventIdentity: string): Promise<Heroku.AppWebhookEvent>;
    /**
     * Lists existing webhook events for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    list(addOnIdentity: string): Promise<Heroku.AppWebhookEvent[]>;
}
