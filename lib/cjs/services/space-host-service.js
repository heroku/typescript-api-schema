"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Space Host](https://devcenter.heroku.com/articles/platform-api-reference#space-host)
 * [Space Hosts](https://devcenter.heroku.com/articles/private-spaces-dedicated-hosts?preview=1) lists dedicated hosts allocated to a space
 */
class SpaceHostService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List hosts
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async list(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/hosts`, {
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
exports.default = SpaceHostService;
