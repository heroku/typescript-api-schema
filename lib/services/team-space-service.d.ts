import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Space](https://devcenter.heroku.com/articles/platform-api-reference#team-space)
* A space is an isolated, highly available, secure app execution environment.
*/
export default class TeamSpaceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List spaces owned by the team
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    list(teamIdentity: string): Promise<Heroku.Space[]>;
}
