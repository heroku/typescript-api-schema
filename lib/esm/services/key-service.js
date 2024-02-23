/**
 * [Heroku Platform API - Key](https://devcenter.heroku.com/articles/platform-api-reference#key)
 * Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
 */
export default class KeyService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for existing key.
     *
     * @param keyIdentity unique identifier of this key or a unique identifying string based on contents.
     * @param requestInit The initializer for the request.
     */
    async info(keyIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/keys/${keyIdentity}`, {
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
     * List existing keys.
     *
     * @param requestInit The initializer for the request.
     */
    async list(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/keys`, {
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
