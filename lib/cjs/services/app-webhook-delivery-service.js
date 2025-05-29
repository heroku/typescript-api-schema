"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - App Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
class AppWebhookDeliveryService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Returns the info for an existing delivery.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appWebhookDeliveryIdentity the delivery's unique identifier.
     * @param requestInit The initializer for the request.
     */
    async info(appIdentity, appWebhookDeliveryIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Lists existing deliveries for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async list(appIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhook-deliveries`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = AppWebhookDeliveryService;
