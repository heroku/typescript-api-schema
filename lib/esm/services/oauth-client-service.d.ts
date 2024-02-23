import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Client](https://devcenter.heroku.com/articles/platform-api-reference#oauth-client)
 * OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
 */
export default class OauthClientService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new OAuth client.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.OauthClientCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthClient>;
    /**
     * Delete OAuth client.
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param requestInit The initializer for the request.
     */
    delete(oauthClientIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthClient>;
    /**
     * Info for an OAuth client. The output for unauthenticated requests excludes the `secret` parameter.
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param requestInit The initializer for the request.
     */
    info(oauthClientIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
    /**
     * List OAuth clients
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthClient[]>;
    /**
     * Update OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(oauthClientIdentity: string, payload: Heroku.OauthClientUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthClient>;
    /**
     * Rotate credentials for an OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param requestInit The initializer for the request.
     */
    rotateCredentials(oauthClientIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthClient>;
}
