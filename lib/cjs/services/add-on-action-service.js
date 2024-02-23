"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Add-on Action](https://devcenter.heroku.com/articles/platform-api-reference#add-on-action)
 * Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
 */
class AddOnActionService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Mark an add-on as provisioned for use.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    async provision(addOnIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/actions/provision`, {
            ...requestInit,
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Mark an add-on as deprovisioned.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    async deprovision(addOnIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/actions/deprovision`, {
            ...requestInit,
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
exports.default = AddOnActionService;
