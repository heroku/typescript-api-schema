"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Setup API - App Setup](https://devcenter.heroku.com/articles/platform-api-reference#app-setup)
 * An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
 */
class AppSetupService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new app setup from a gzipped tar archive containing an app.json manifest file.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/app-setups`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
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
     * Get the status of an app setup.
     *
     * @param appSetupIdentity unique identifier of app setup.
     * @param requestInit The initializer for the request.
     */
    async info(appSetupIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/app-setups/${appSetupIdentity}`, {
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
exports.default = AppSetupService;
