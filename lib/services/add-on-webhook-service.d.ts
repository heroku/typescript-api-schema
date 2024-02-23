import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook)
* Represents the details of a webhook subscription
*/
export default class AddOnWebhookService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 * @param body Object to send to the endpoint.
 */
    create(addOnIdentity: string, body: Heroku.AddOnWebhookCreatePayload): Promise<Heroku.AddonWebhook>;
    /**
     * Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    delete(addOnIdentity: string, appWebhookIdentity: string): Promise<Heroku.AddonWebhook>;
    /**
     * Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    info(addOnIdentity: string, appWebhookIdentity: string): Promise<Heroku.AddonWebhook>;
    /**
     * List all webhook subscriptions for a particular add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    list(addOnIdentity: string): Promise<Heroku.AddonWebhook[]>;
    /**
     * Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param body Object to send to the endpoint.
     */
    update(addOnIdentity: string, appWebhookIdentity: string, body: Heroku.AddOnWebhookUpdatePayload): Promise<Heroku.AddonWebhook>;
}
