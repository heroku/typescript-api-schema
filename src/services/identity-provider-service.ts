import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Identity Provider](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider)
 * Identity Providers represent the SAML configuration of an Enterprise Account or Team.
 */
export default class IdentityProviderService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Get a list of a team's Identity Providers
   *
   * @param teamName unique name of team
   * @example example.
   */
  public async listByTeam(teamName: string): Promise<Heroku.IdentityProvider[]> {
    const response = await this.heroku.get<Heroku.IdentityProvider[]>(`/teams/${teamName}/identity-providers`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create an Identity Provider for a team
   *
   * @param teamName unique name of team
   * @example example.
   * @param body Object to send to the endpoint.
   */
  public async createByTeam(
    teamName: string,
    body: Heroku.IdentityProviderCreateByTeamPayload
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.heroku.post<Heroku.IdentityProvider>(`/teams/${teamName}/identity-providers`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Update a team's Identity Provider
   *
   * @param teamName unique name of team
   * @example example.
   * @param identityProviderId unique identifier of this identity provider
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param body Object to send to the endpoint.
   */
  public async updateByTeam(
    teamName: string,
    identityProviderId: string,
    body: Heroku.IdentityProviderUpdateByTeamPayload
  ): Promise<Heroku.IdentityProvider> {
    const response = await this.heroku.patch<Heroku.IdentityProvider>(
      `/teams/${teamName}/identity-providers/${identityProviderId}`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * Delete a team's Identity Provider
   *
   * @param teamName unique name of team
   * @example example.
   * @param identityProviderId unique identifier of this identity provider
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async deleteByTeam(teamName: string, identityProviderId: string): Promise<Heroku.IdentityProvider> {
    const response = await this.heroku.delete<Heroku.IdentityProvider>(
      `/teams/${teamName}/identity-providers/${identityProviderId}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
