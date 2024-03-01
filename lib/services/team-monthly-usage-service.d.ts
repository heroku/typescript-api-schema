import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Monthly Usage](https://devcenter.heroku.com/articles/platform-api-reference#team-monthly-usage)
* Usage for an enterprise team at a monthly resolution.
*/
export default class TeamMonthlyUsageService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Retrieves usage for an enterprise team for a range of months. Start and end dates can be specified as query parameters using the date, YYYY-MM. If no end date is specified, one month of usage is returned. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).

 *
 * @param teamId unique identifier of team
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 * @param body Object to send to the endpoint.
 */
    info(teamId: string, body: Heroku.TeamMonthlyUsageInfoPayload): Promise<Heroku.TeamMonthlyUsage[]>;
}
