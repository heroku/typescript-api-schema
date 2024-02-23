import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Permission](https://devcenter.heroku.com/articles/platform-api-reference#team-app-permission)
* A team app permission is a behavior that is assigned to a user in a team app.
*/
export default class TeamAppPermissionService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Lists permissions available to teams.
 *
 */
    list(): Promise<Heroku.TeamAppPermission[]>;
}
