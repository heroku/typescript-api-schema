import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-delivery)
* Represents the delivery of a webhook notification, including its current status.
*/
export default class AddOnWebhookDeliveryService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Returns the info for an existing delivery.  Can only be accessed by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 * @param appWebhookDeliveryIdentity the delivery's unique identifier.
 */
    info(addOnIdentity: string, appWebhookDeliveryIdentity: string): Promise<Heroku.AppWebhookDelivery>;
    /**
     * Lists existing deliveries for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    list(addOnIdentity: string): Promise<Heroku.AppWebhookDelivery[]>;
}
