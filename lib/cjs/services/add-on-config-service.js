"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Add-on Config](https://devcenter.heroku.com/articles/platform-api-reference#add-on-config)
 * Configuration of an Add-on
 */
class AddOnConfigService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Get an add-on's config. Accessible by customers with access and by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    async list(addOnIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/config`, {
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
     * Update an add-on's config. Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(addOnIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/config`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
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
exports.default = AddOnConfigService;
