import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Allowed Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#allowed-add-on-service)
* Entities that have been allowed to be used by a Team
*/
export default class AllowedAddOnServiceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List all allowed add-on services for a team
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    listByTeam(teamIdentity: string): Promise<Heroku.AllowedAddOnService[]>;
    /**
     * Allow an Add-on Service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    createByTeam(teamIdentity: string, body: Heroku.AllowedAddOnServiceCreateByTeamPayload): Promise<Heroku.AllowedAddOnService[]>;
    /**
     * Remove an allowed add-on service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param allowedAddOnServiceIdentity unique identifier for this allowed add-on service record or unique name of this add-on-service.
     */
    deleteByTeam(teamIdentity: string, allowedAddOnServiceIdentity: string): Promise<Heroku.AllowedAddOnService>;
}
