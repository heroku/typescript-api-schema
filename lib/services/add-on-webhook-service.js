/**
 Heroku Platform API - Add-on Webhook
Represents the details of a webhook subscription

*/
export default class AddOnWebhookService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 * @param body Object to send to the endpoint.
 */
    async create(addOnIdentity, body) {
        const response = await this.heroku.post(`/addons/${addOnIdentity}/webhooks`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    async delete(addOnIdentity, appWebhookIdentity) {
        const response = await this.heroku.delete(`/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    async info(addOnIdentity, appWebhookIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List all webhook subscriptions for a particular add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async list(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/webhooks`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param body Object to send to the endpoint.
     */
    async update(addOnIdentity, appWebhookIdentity, body) {
        const response = await this.heroku.patch(`/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
