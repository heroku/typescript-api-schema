import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Buildpack Installations](https://devcenter.heroku.com/articles/platform-api-reference#buildpack-installation)
 * A buildpack installation represents a buildpack that will be run against an app.
 */
export default class BuildpackInstallationService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Update an app's buildpack installations.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    body: Heroku.BuildpackInstallationUpdatePayload
  ): Promise<Heroku.BuildpackInstallation[]> {
    const response = await this.heroku.put<Heroku.BuildpackInstallation[]>(
      `/apps/${appIdentity}/buildpack-installations`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * List an app's existing buildpack installations.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.BuildpackInstallation[]> {
    const response = await this.heroku.get<Heroku.BuildpackInstallation[]>(
      `/apps/${appIdentity}/buildpack-installations`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
}
