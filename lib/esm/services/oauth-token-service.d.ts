import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Token](https://devcenter.heroku.com/articles/platform-api-reference#oauth-token)
 * OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthTokenService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new OAuth token.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.OauthTokenCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthToken>;
    /**
     * Revoke OAuth access token.
     *
     * @param oauthTokenIdentity unique identifier of OAuth token.
     * @param requestInit The initializer for the request.
     */
    delete(oauthTokenIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthToken>;
}
