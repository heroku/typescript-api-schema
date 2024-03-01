/**
 Heroku Platform API - Add-on Webhook Event
Represents a webhook event that occurred.

*/
export default class AddOnWebhookEventService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Returns the info for a specified webhook event.  Can only be accessed by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 * @param appWebhookEventIdentity the event's unique identifier.
 */
    async info(addOnIdentity, appWebhookEventIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/webhook-events/${appWebhookEventIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Lists existing webhook events for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async list(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/webhook-events`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
