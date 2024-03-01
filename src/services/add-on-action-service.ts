import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Action](https://devcenter.heroku.com/articles/platform-api-reference#add-on-action)
 * Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
 */
export default class AddOnActionService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Mark an add-on as provisioned for use.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async provision(addOnIdentity: string): Promise<Heroku.AddOn> {
    const response = await this.heroku.post<Heroku.AddOn>(`/addons/${addOnIdentity}/actions/provision`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Mark an add-on as deprovisioned.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async deprovision(addOnIdentity: string): Promise<Heroku.AddOn> {
    const response = await this.heroku.post<Heroku.AddOn>(`/addons/${addOnIdentity}/actions/deprovision`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
