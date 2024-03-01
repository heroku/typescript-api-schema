/**
 Heroku Platform API - Add-on Webhook Delivery
Represents the delivery of a webhook notification, including its current status.

*/
export default class AddOnWebhookDeliveryService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Returns the info for an existing delivery.  Can only be accessed by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 * @param appWebhookDeliveryIdentity the delivery's unique identifier.
 */
    async info(addOnIdentity, appWebhookDeliveryIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Lists existing deliveries for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async list(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/webhook-deliveries`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
