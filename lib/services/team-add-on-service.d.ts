import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Add-on](https://devcenter.heroku.com/articles/platform-api-reference#team-add-on)
*
*/
export default class TeamAddOnService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List add-ons used across all Team apps
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    listForTeam(teamIdentity: string): Promise<Heroku.AddOn[]>;
}
