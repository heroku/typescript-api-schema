import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Rate Limit](https://devcenter.heroku.com/articles/platform-api-reference#rate-limit)
 * Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
 */
export default class RateLimitService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for rate limits.
     *
     * @param requestInit The initializer for the request.
     */
    info(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.RateLimit>;
}
