import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team](https://devcenter.heroku.com/articles/platform-api-reference#team)
* Teams allow you to manage access to a shared group of applications and other resources.
*/
export default class TeamService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List teams in which you are a member.
 *
 */
    list(): Promise<Heroku.Team[]>;
    /**
     * Info for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    info(teamIdentity: string): Promise<Heroku.Team>;
    /**
     * Update team properties.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    update(teamIdentity: string, body: Heroku.TeamUpdatePayload): Promise<Heroku.Team>;
    /**
     * Create a new team.
     *
     * @param body Object to send to the endpoint.
     */
    create(body: Heroku.TeamCreatePayload): Promise<Heroku.Team>;
    /**
     * Delete an existing team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    delete(teamIdentity: string): Promise<Heroku.Team>;
    /**
     * List teams for an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     */
    listByEnterpriseAccount(enterpriseAccountIdentity: string): Promise<Heroku.Team[]>;
    /**
     * Create a team in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     * @param body Object to send to the endpoint.
     */
    createInEnterpriseAccount(enterpriseAccountIdentity: string, body: Heroku.TeamCreateInEnterpriseAccountPayload): Promise<Heroku.Team>;
}
