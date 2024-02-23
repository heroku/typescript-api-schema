import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Rate Limit](https://devcenter.heroku.com/articles/platform-api-reference#rate-limit)
 * Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
 */
export default class RateLimitService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for rate limits.
   *
   * @param requestInit The initializer for the request.
   */
  public async info(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.RateLimit> {
    const response = await this.fetchImpl(`${this.endpoint}/account/rate-limits`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.RateLimit>;
    }
    throw new Error(response.statusText);
  }
}
