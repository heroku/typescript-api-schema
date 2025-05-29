import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team License Collection](https://devcenter.heroku.com/articles/platform-api-reference#team-license-collection)
 * A team license collection is credits provided and consumed by the team per period.
 */
export default class TeamLicenseCollectionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List team licenses.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamLicenseCollection[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/license-collections`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamLicenseCollection[]>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
