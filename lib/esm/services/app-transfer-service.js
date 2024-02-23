/**
 * [Heroku Platform API - App Transfer](https://devcenter.heroku.com/articles/platform-api-reference#app-transfer)
 * An app transfer represents a two party interaction for transferring ownership of an app.
 */
export default class AppTransferService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new app transfer.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers`, {
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
     * Delete an existing app transfer
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async delete(appTransferIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers/${appTransferIdentity}`, {
            ...requestInit,
            method: 'DELETE',
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
     * Info for existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async info(appTransferIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers/${appTransferIdentity}`, {
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
     * List existing apps transfers.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers`, {
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
     * Update an existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(appTransferIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/app-transfers/${appTransferIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
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
