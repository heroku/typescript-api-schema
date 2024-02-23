import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#add-on-service)
 * Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class AddOnServiceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing add-on-service.
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   */
  public async info(addOnServiceIdentity: string): Promise<Heroku.AddOnService> {
    const response = await this.heroku.get<Heroku.AddOnService>(`/addon-services/${addOnServiceIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing add-on-services.
   *
   */
  public async list(): Promise<Heroku.AddOnService[]> {
    const response = await this.heroku.get<Heroku.AddOnService[]>(`/addon-services`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
