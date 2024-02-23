import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Enterprise Account Daily Usage](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-daily-usage)
* Usage for an enterprise account at a daily resolution.
*/
export default class EnterpriseAccountDailyUsageService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Retrieves usage for an enterprise account for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).

 *
 * @param enterpriseAccountId unique identifier of the enterprise account
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 * @param body Object to send to the endpoint.
 */
    info(enterpriseAccountId: string, body: Heroku.EnterpriseAccountDailyUsageInfoPayload): Promise<Heroku.EnterpriseAccountDailyUsage[]>;
}
