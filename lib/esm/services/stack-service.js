/**
 * [Heroku Platform API - Stack](https://devcenter.heroku.com/articles/platform-api-reference#stack)
 * Stacks are the different application execution environments available in the Heroku platform.
 */
export default class StackService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Stack info.
     *
     * @param stackIdentity unique name of stack or unique identifier of stack.
     * @param requestInit The initializer for the request.
     */
    async info(stackIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/stacks/${stackIdentity}`, {
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
     * List available stacks.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/stacks`, {
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
