/**
 Heroku Platform API - App Webhook
Represents the details of a webhook subscription

*/
export default class AppWebhookService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create an app webhook subscription.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/webhooks`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Removes an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    async delete(appIdentity, appWebhookIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Returns the info for an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     */
    async info(appIdentity, appWebhookIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List all webhook subscriptions for a particular app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/webhooks`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Updates the details of an app webhook subscription.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookIdentity the webhook's unique identifier.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, appWebhookIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
