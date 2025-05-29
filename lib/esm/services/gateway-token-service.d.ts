import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Gateway Token](https://devcenter.heroku.com/articles/platform-api-reference#gateway-token)
 * Contains a set of information useful for identifying a user and the type of access this user is allowed to have.
 */
export default class GatewayTokenService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Generate a gateway token for a user. Note that a JWT version of the
     * token will be available in `Heroku-Gateway-Token` header.
     *
     * @param requestInit The initializer for the request.
     */
    create(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.GatewayToken>;
    /**
     * Generates a Proxy oauth acccess tokens for the passed in gateway token.
     * This new proxy token is designed to have a shorter lifetime than the
     * user supplied token so it is safe to pass to futher downstream services
     * without increasing the breadth of the long lived tokens.
     *
     * @param requestInit The initializer for the request.
     */
    oauthToken(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthToken>;
}
