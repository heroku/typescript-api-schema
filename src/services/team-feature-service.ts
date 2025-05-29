import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Feature](https://devcenter.heroku.com/articles/platform-api-reference#team-feature)
 * A team feature represents a feature enabled on a team account.
 */
export default class TeamFeatureService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for an existing team feature.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param teamFeatureIdentity unique identifier of team feature or unique name of team feature.
   * @param requestInit The initializer for the request.
   */
  public async info(
    teamIdentity: string,
    teamFeatureIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamFeature> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/features/${teamFeatureIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamFeature>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * List existing team features.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.TeamFeature[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/features`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.TeamFeature[]>;
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
