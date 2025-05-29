"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Processes Inside Dynos](https://devcenter.heroku.com/articles/platform-api-reference#dyno-processes)
 * Run processes inside existing dynos.
 */
class DynoProcessesService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new process in an existing dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(appIdentity, dynoIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/dynos/${dynoIdentity}`, {
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
exports.default = DynoProcessesService;
