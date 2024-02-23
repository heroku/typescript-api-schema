import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Rate Limit](https://devcenter.heroku.com/articles/platform-api-reference#rate-limit)
 * Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
 */
export default class RateLimitService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for rate limits.
   *
   */
  public async info(): Promise<Heroku.RateLimit> {
    const response = await this.heroku.get<Heroku.RateLimit>(`/account/rate-limits`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
