import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Permission Entity](https://devcenter.heroku.com/articles/platform-api-reference#permission-entity)
* An owned entity including users' permissions.
*/
export default class PermissionEntityService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List permission entities for a team.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 */
    list(teamIdentity: string): Promise<Heroku.PermissionEntity[]>;
}
