import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Key](https://devcenter.heroku.com/articles/platform-api-reference#key)
 * Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
 */
export default class KeyService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for existing key.
     *
     * @param keyIdentity unique identifier of this key or a unique identifying string based on contents.
     * @param requestInit The initializer for the request.
     */
    info(keyIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Key>;
    /**
     * List existing keys.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Key[]>;
}
