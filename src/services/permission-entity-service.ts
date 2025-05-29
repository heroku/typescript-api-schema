import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Permission Entity](https://devcenter.heroku.com/articles/platform-api-reference#permission-entity)
 * An owned entity including users' permissions.
 */
export default class PermissionEntityService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List permission entities for a team.
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   * @param requestInit The initializer for the request.
   */
  public async list(
    teamIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PermissionEntity[]> {
    const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/permissions`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PermissionEntity[]>;
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
