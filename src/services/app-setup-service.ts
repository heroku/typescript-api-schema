import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Setup API - App Setup](https://devcenter.heroku.com/articles/platform-api-reference#app-setup)
 * An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
 */
export default class AppSetupService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new app setup from a gzipped tar archive containing an app.json manifest file.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.AppSetupCreatePayload): Promise<Heroku.AppSetup> {
    const response = await this.heroku.post<Heroku.AppSetup>(`/app-setups`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Get the status of an app setup.
   *
   * @param appSetupIdentity unique identifier of app setup.
   */
  public async info(appSetupIdentity: string): Promise<Heroku.AppSetup> {
    const response = await this.heroku.get<Heroku.AppSetup>(`/app-setups/${appSetupIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
