"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Region](https://devcenter.heroku.com/articles/platform-api-reference#region)
 * A region represents a geographic location in which your application may run.
 */
class RegionService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for existing region.
     *
     * @param regionIdentity unique identifier of region or unique name of region.
     * @param requestInit The initializer for the request.
     */
    async info(regionIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/regions/${regionIdentity}`, {
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
     * List existing regions.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/regions`, {
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
exports.default = RegionService;
