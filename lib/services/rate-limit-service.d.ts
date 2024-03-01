import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Rate Limit](https://devcenter.heroku.com/articles/platform-api-reference#rate-limit)
* Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
*/
export default class RateLimitService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for rate limits.
 *
 */
    info(): Promise<Heroku.RateLimit>;
}
