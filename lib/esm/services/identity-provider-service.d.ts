import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider)
 * Identity Providers represent the SSO configuration of an Enterprise Account or Team.
 */
export default class IdentityProviderService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for an Identity Provider
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    info(identityProviderIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
    /**
     * Create an Identity Provider
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.IdentityProviderCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
    /**
     * Update an Identity Provider
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(identityProviderIdentity: string, payload: Heroku.IdentityProviderUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
}
