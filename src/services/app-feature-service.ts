import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Feature](https://devcenter.heroku.com/articles/platform-api-reference#app-feature)
 * An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.
 */
export default class AppFeatureService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for an existing app feature.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
   */
  public async info(appIdentity: string, appFeatureIdentity: string): Promise<Heroku.AppFeature> {
    const response = await this.heroku.get<Heroku.AppFeature>(`/apps/${appIdentity}/features/${appFeatureIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing app features.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.AppFeature[]> {
    const response = await this.heroku.get<Heroku.AppFeature[]>(`/apps/${appIdentity}/features`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an existing app feature.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    appFeatureIdentity: string,
    body: Heroku.AppFeatureUpdatePayload
  ): Promise<Heroku.AppFeature> {
    const response = await this.heroku.patch<Heroku.AppFeature>(`/apps/${appIdentity}/features/${appFeatureIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
