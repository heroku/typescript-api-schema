"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Space Transfer](https://devcenter.heroku.com/articles/platform-api-reference#space-transfer)
 * Transfer spaces between enterprise teams with the same Enterprise Account.
 */
class SpaceTransferService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Transfer space between enterprise teams
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async transfer(spaceIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/transfer`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
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
exports.default = SpaceTransferService;
