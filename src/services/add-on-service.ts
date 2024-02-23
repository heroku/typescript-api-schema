import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on](https://devcenter.heroku.com/articles/platform-api-reference#add-on)
 * Add-ons represent add-ons that have been provisioned and attached to one or more apps.
 */
export default class AddOnService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List all existing add-ons.
   *
   */
  public async list(): Promise<Heroku.AddOn[]> {
    const response = await this.heroku.get<Heroku.AddOn[]>(`/addons`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for an existing add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async info(addOnIdentity: string): Promise<Heroku.AddOn> {
    const response = await this.heroku.get<Heroku.AddOn>(`/addons/${addOnIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create a new add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.AddOnCreatePayload): Promise<Heroku.AddOn> {
    const response = await this.heroku.post<Heroku.AddOn>(`/apps/${appIdentity}/addons`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async delete(appIdentity: string, addOnIdentity: string): Promise<Heroku.AddOn> {
    const response = await this.heroku.delete<Heroku.AddOn>(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for an existing add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async infoByApp(appIdentity: string, addOnIdentity: string): Promise<Heroku.AddOn> {
    const response = await this.heroku.get<Heroku.AddOn>(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing add-ons for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async listByApp(appIdentity: string): Promise<Heroku.AddOn[]> {
    const response = await this.heroku.get<Heroku.AddOn[]>(`/apps/${appIdentity}/addons`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    addOnIdentity: string,
    body: Heroku.AddOnUpdatePayload
  ): Promise<Heroku.AddOn> {
    const response = await this.heroku.patch<Heroku.AddOn>(`/apps/${appIdentity}/addons/${addOnIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * List all existing add-ons a user has access to
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   */
  public async listByUser(accountIdentity: string): Promise<Heroku.AddOn[]> {
    const response = await this.heroku.get<Heroku.AddOn[]>(`/users/${accountIdentity}/addons`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List add-ons used across all Team apps
   *
   * @param teamIdentity unique name of team or unique identifier of team.
   */
  public async listByTeam(teamIdentity: string): Promise<Heroku.AddOn[]> {
    const response = await this.heroku.get<Heroku.AddOn[]>(`/teams/${teamIdentity}/addons`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many.
   *
   * @param body Object to send to the endpoint.
   */
  public async resolution(body: Heroku.AddOnResolutionPayload): Promise<Heroku.AddOn[]> {
    const response = await this.heroku.post<Heroku.AddOn[]>(`/actions/addons/resolve`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
