/**
 * [Heroku Platform API - Rate Limit](https://devcenter.heroku.com/articles/platform-api-reference#rate-limit)
 * Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
 */
export default class RateLimitService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for rate limits.
     *
     * @param requestInit The initializer for the request.
     */
    async info(requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/account/rate-limits`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
