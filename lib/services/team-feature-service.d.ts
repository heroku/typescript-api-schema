import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Feature](https://devcenter.heroku.com/articles/platform-api-reference#team-feature)
* A team feature represents a feature enabled on a team account.
*/
export default class TeamFeatureService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for an existing team feature.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 * @param teamFeatureIdentity unique identifier of team feature or unique name of team feature.
 */
    info(teamIdentity: string, teamFeatureIdentity: string): Promise<Heroku.TeamFeature>;
    /**
     * List existing team features.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    list(teamIdentity: string): Promise<Heroku.TeamFeature[]>;
}
