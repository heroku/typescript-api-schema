"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Team Monthly Usage](https://devcenter.heroku.com/articles/platform-api-reference#team-monthly-usage)
 * Usage for an enterprise team at a monthly resolution.
 */
class TeamMonthlyUsageService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Retrieves usage for an enterprise team for a range of months. Start and end dates can be specified as query parameters using the date, YYYY-MM. If no end date is specified, one month of usage is returned. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
     *
     * @param teamId unique identifier of team
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async info(teamId, payload, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamId}/usage/monthly`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
exports.default = TeamMonthlyUsageService;