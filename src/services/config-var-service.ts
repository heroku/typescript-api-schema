import type { APIClient } from '@heroku-cli/command';
/**
 * [Heroku Platform API - Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#config-var)
 * Config Vars allow you to manage the configuration information provided to an app on Heroku.
 */
export default class ConfigVarService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Get config-vars for app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async infoForApp(appIdentity: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.get<Record<string, unknown>>(`/apps/${appIdentity}/config-vars`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Get config-vars for a release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param releaseIdentity unique identifier of release or unique version assigned to the release.
   */
  public async infoForAppRelease(
    appIdentity: string,
    releaseIdentity: string | number
  ): Promise<Record<string, unknown>> {
    const response = await this.heroku.get<Record<string, unknown>>(
      `/apps/${appIdentity}/releases/${releaseIdentity}/config-vars`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Update config-vars for app. You can update existing config-vars by setting them again, and remove by setting it to `null`.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async update(appIdentity: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
    const response = await this.heroku.patch<Record<string, unknown>>(`/apps/${appIdentity}/config-vars`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
