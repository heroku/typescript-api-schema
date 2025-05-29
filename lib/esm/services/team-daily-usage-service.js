/**
 * [Heroku Platform API - Team Daily Usage](https://devcenter.heroku.com/articles/platform-api-reference#team-daily-usage)
 * Usage for an enterprise team at a daily resolution.
 */
export default class TeamDailyUsageService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Retrieves usage for an enterprise team for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
     *
     * @param teamId unique identifier of team
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async info(teamId, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/${teamId}/usage/daily`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
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
