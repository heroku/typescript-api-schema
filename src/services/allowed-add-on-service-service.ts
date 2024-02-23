import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Allowed Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#allowed-add-on-service)
 * Entities that have been allowed to be used by a Team
 */
export default class AllowedAddOnServiceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List all allowed add-on services for a team
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async listByTeam(teamIdentity: string): Promise<Heroku.AllowedAddOnService[]> {
    const response = await this.heroku.get<Heroku.AllowedAddOnService[]>(
      `/teams/${teamIdentity}/allowed-addon-services`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Allow an Add-on Service
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param body Object to send to the endpoint.
   */
  public async createByTeam(
    teamIdentity: string,
    body: Heroku.AllowedAddOnServiceCreateByTeamPayload
  ): Promise<Heroku.AllowedAddOnService[]> {
    const response = await this.heroku.post<Heroku.AllowedAddOnService[]>(
      `/teams/${teamIdentity}/allowed-addon-services`,
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
   * Remove an allowed add-on service
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param allowedAddOnServiceIdentity unique identifier for this allowed add-on service record or unique name of this add-on-service.
   */
  public async deleteByTeam(
    teamIdentity: string,
    allowedAddOnServiceIdentity: string
  ): Promise<Heroku.AllowedAddOnService> {
    const response = await this.heroku.delete<Heroku.AllowedAddOnService>(
      `/teams/${teamIdentity}/allowed-addon-services/${allowedAddOnServiceIdentity}`,
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
