"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Add-on Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
class AddOnWebhookDeliveryService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Returns the info for an existing delivery.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param appWebhookDeliveryIdentity the delivery's unique identifier.
     * @param requestInit The initializer for the request.
     */
    async info(addOnIdentity, appWebhookDeliveryIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/addons/${addOnIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`, {
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
     * Lists existing deliveries for an add-on.  Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    async list(addOnIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/addons/${addOnIdentity}/webhook-deliveries`, {
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
exports.default = AddOnWebhookDeliveryService;