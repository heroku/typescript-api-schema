/**
 Heroku Platform API - Enterprise Account Daily Usage
Usage for an enterprise account at a daily resolution.

*/
export default class EnterpriseAccountDailyUsageService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieves usage for an enterprise account for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).

 *
 * @param enterpriseAccountId unique identifier of the enterprise account.
 * @param body Object to send to the endpoint.
 */
    async info(enterpriseAccountId, body) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountId}/usage/daily`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
