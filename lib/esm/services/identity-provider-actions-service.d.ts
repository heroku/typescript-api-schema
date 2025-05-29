import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider Actions](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider-actions)
 * Actions taken on Identity Providers, the SSO configuration representation.
 */
export default class IdentityProviderActionsService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Migrate an Identity Provider
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    update(identityProviderIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
}
