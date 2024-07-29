"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - App Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
class AppWebhookDeliveryService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Returns the info for an existing delivery.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookDeliveryIdentity the delivery's unique identifier.
     * @param requestInit The initializer for the request.
     */
    async info(appIdentity, appWebhookDeliveryIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/apps/${appIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Lists existing deliveries for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async list(appIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/apps/${appIdentity}/webhook-deliveries`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
exports.default = AppWebhookDeliveryService;