/**
 Heroku Platform API - Team Monthly Usage
Usage for an enterprise team at a monthly resolution.

*/
export default class TeamMonthlyUsageService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieves usage for an enterprise team for a range of months. Start and end dates can be specified as query parameters using the date, YYYY-MM. If no end date is specified, one month of usage is returned. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).

 *
 * @param teamId unique identifier of team.
 * @param body Object to send to the endpoint.
 */
    async info(teamId, body) {
        const response = await this.heroku.get(`/teams/${teamId}/usage/monthly`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
