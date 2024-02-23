import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Authorization](https://devcenter.heroku.com/articles/platform-api-reference#oauth-authorization)
 * OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthAuthorizationService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new OAuth authorization.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.OauthAuthorizationCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthAuthorization>;
    /**
     * Delete OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param requestInit The initializer for the request.
     */
    delete(oauthAuthorizationIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthAuthorization>;
    /**
     * Info for an OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param requestInit The initializer for the request.
     */
    info(oauthAuthorizationIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthAuthorization>;
    /**
     * List OAuth authorizations.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthAuthorization[]>;
    /**
     * Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     * @param requestInit The initializer for the request.
     */
    regenerate(oauthAuthorizationIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.OauthAuthorization>;
}
