import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App](https://devcenter.heroku.com/articles/platform-api-reference#team-app)
* A team app encapsulates the team specific functionality of Heroku apps.
*/
export default class TeamAppService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.TeamAppCreatePayload): Promise<Heroku.TeamApp>;
    /**
     * Info for a team app.
     *
     * @param teamAppIdentity unique name of app.
     */
    info(teamAppIdentity: string): Promise<Heroku.TeamApp>;
    /**
     * Lock or unlock a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param body Object to send to the endpoint.
     */
    updateLocked(teamAppIdentity: string, body: Heroku.TeamAppUpdateLockedPayload): Promise<Heroku.TeamApp>;
    /**
     * Transfer an existing team app to another Heroku account.
     *
     * @param teamAppIdentity unique name of app.
     * @param body Object to send to the endpoint.
     */
    transferToAccount(teamAppIdentity: string, body: Heroku.TeamAppTransferToAccountPayload): Promise<void>;
    /**
     * Transfer an existing team app to another team.
     *
     * @param teamAppIdentity unique name of app.
     * @param body Object to send to the endpoint.
     */
    transferToTeam(teamAppIdentity: string, body: Heroku.TeamAppTransferToTeamPayload): Promise<Heroku.TeamApp>;
    /**
     * List team apps.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    listByTeam(teamIdentity: string): Promise<Heroku.TeamApp[]>;
}
