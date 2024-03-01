/**
 Heroku Platform API - Enterprise Account Monthly Usage
Usage for an enterprise account at a monthly resolution.

*/
export default class EnterpriseAccountMonthlyUsageService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieves usage for an enterprise account for a range of months. Start and end dates can be specified as query parameters using the date format YYYY-MM. If no end date is specified, one month of usage is returned. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).

 *
 * @param enterpriseAccountId unique identifier of the enterprise account.
 * @param body Object to send to the endpoint.
 */
    async info(enterpriseAccountId, body) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountId}/usage/monthly`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
