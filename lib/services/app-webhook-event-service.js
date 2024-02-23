/**
 Heroku Platform API - App Webhook Event
Represents a webhook event that occurred.

*/
export default class AppWebhookEventService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Returns the info for a specified webhook event.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param appWebhookEventIdentity the event's unique identifier.
 */
    async info(appIdentity, appWebhookEventIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/webhook-events/${appWebhookEventIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Lists existing webhook events for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/webhook-events`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
