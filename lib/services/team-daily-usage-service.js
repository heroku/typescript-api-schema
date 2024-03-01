/**
 Heroku Platform API - Team Daily Usage
Usage for an enterprise team at a daily resolution.

*/
export default class TeamDailyUsageService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Retrieves usage for an enterprise team for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).

 *
 * @param teamId unique identifier of team.
 * @param body Object to send to the endpoint.
 */
    async info(teamId, body) {
        const response = await this.heroku.get(`/teams/${teamId}/usage/daily`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
