import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Daily Usage](https://devcenter.heroku.com/articles/platform-api-reference#team-daily-usage)
 * Usage for an enterprise team at a daily resolution.
 */
export default class TeamDailyUsageService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Retrieves usage for an enterprise team for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
   *
   * @param teamId unique identifier of team
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async info(
    teamId: string,
    payload: Heroku.TeamDailyUsageInfoPayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamDailyUsage[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamId}/usage/daily`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamDailyUsage[]>;
    }
    throw new Error(response.statusText);
  }
}
