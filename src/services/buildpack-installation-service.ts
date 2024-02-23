import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Buildpack Installations](https://devcenter.heroku.com/articles/platform-api-reference#buildpack-installation)
 * A buildpack installation represents a buildpack that will be run against an app.
 */
export default class BuildpackInstallationService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Update an app's buildpack installations.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    payload: Heroku.BuildpackInstallationUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.BuildpackInstallation[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/buildpack-installations`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PUT',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.BuildpackInstallation[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List an app's existing buildpack installations.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.BuildpackInstallation[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/buildpack-installations`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.BuildpackInstallation[]>;
    }
    throw new Error(response.statusText);
  }
}
