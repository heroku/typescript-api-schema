/**
 Heroku Platform API - Rate Limit
Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.

*/
export default class RateLimitService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for rate limits.
 *
 */
    async info() {
        const response = await this.heroku.get(`/account/rate-limits`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
