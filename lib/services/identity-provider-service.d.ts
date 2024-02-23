import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider)
* Identity Providers represent the SAML configuration of an Enterprise Account or Team.
*/
export default class IdentityProviderService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Get a list of a team's Identity Providers
 *
 * @param teamName unique name of team
 * @example example.
 */
    listByTeam(teamName: string): Promise<Heroku.IdentityProvider[]>;
    /**
     * Create an Identity Provider for a team
     *
     * @param teamName unique name of team
     * @example example.
     * @param body Object to send to the endpoint.
     */
    createByTeam(teamName: string, body: Heroku.IdentityProviderCreateByTeamPayload): Promise<Heroku.IdentityProvider>;
    /**
     * Update a team's Identity Provider
     *
     * @param teamName unique name of team
     * @example example.
     * @param identityProviderId unique identifier of this identity provider
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     * @param body Object to send to the endpoint.
     */
    updateByTeam(teamName: string, identityProviderId: string, body: Heroku.IdentityProviderUpdateByTeamPayload): Promise<Heroku.IdentityProvider>;
    /**
     * Delete a team's Identity Provider
     *
     * @param teamName unique name of team
     * @example example.
     * @param identityProviderId unique identifier of this identity provider
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     */
    deleteByTeam(teamName: string, identityProviderId: string): Promise<Heroku.IdentityProvider>;
}
