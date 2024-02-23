import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Config](https://devcenter.heroku.com/articles/platform-api-reference#add-on-config)
 * Configuration of an Add-on
 */
export default class AddOnConfigService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Get an add-on's config. Accessible by customers with access and by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async list(addOnIdentity: string): Promise<Heroku.AddOnConfig[]> {
    const response = await this.heroku.get<Heroku.AddOnConfig[]>(`/addons/${addOnIdentity}/config`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an add-on's config. Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param body Object to send to the endpoint.
   */
  public async update(addOnIdentity: string, body: Heroku.AddOnConfigUpdatePayload): Promise<Heroku.AddOnConfig[]> {
    const response = await this.heroku.patch<Heroku.AddOnConfig[]>(`/addons/${addOnIdentity}/config`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
