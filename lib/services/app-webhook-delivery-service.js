/**
 Heroku Platform API - App Webhook Delivery
Represents the delivery of a webhook notification, including its current status.

*/
export default class AppWebhookDeliveryService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Returns the info for an existing delivery.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param appWebhookDeliveryIdentity the delivery's unique identifier.
 */
    async info(appIdentity, appWebhookDeliveryIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Lists existing deliveries for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/webhook-deliveries`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
