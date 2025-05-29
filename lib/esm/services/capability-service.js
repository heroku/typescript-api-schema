/**
 * [Heroku Platform API - Capability](https://devcenter.heroku.com/articles/platform-api-reference#capability)
 * A capability represents a requested capability on a resource along with whether the requesting user has that capability
 */
export default class CapabilityService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Request to check a list of capabilities the current user (yourself). An capability is a tuple of
     * (capability, resource_id, resource_type). The endpoint will then respond with a `capable` boolean
     * true or false for each requested capability. This boolean indicates whether the authenticated user
     * has the requested capability on the resource.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async capabilities(payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/users/~/capabilities`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PUT',
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
