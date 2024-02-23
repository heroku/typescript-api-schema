import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider)
 * Identity Providers represent the SAML configuration of teams or an Enterprise account
 */
export default class IdentityProviderService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Get a list of a team's Identity Providers
     *
     * @param teamName unique name of team
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    listByTeam(teamName: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider[]>;
    /**
     * Create an Identity Provider for a team
     *
     * @param teamName unique name of team
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    createByTeam(teamName: string, payload: Heroku.IdentityProviderCreateByTeamPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
    /**
     * Update a team's Identity Provider
     *
     * @param teamName unique name of team
     * @example "example".
     * @param identityProviderId unique identifier of this identity provider
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    updateByTeam(teamName: string, identityProviderId: string, payload: Heroku.IdentityProviderUpdateByTeamPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
    /**
     * Delete a team's Identity Provider
     *
     * @param teamName unique name of team
     * @example "example".
     * @param identityProviderId unique identifier of this identity provider
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    deleteByTeam(teamName: string, identityProviderId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProvider>;
}
