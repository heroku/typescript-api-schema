import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App](https://devcenter.heroku.com/articles/platform-api-reference#app)
 * An app represents the program that you would like to deploy and run on Heroku.
 */
export default class AppService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new app.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.AppCreatePayload): Promise<Heroku.App> {
    const response = await this.heroku.post<Heroku.App>(`/apps`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async delete(appIdentity: string): Promise<Heroku.App> {
    const response = await this.heroku.delete<Heroku.App>(`/apps/${appIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async info(appIdentity: string): Promise<Heroku.App> {
    const response = await this.heroku.get<Heroku.App>(`/apps/${appIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing apps.
   *
   */
  public async list(): Promise<Heroku.App[]> {
    const response = await this.heroku.get<Heroku.App[]>(`/apps`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List owned and collaborated apps (excludes team apps).
   *
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   */
  public async listOwnedAndCollaborated(accountIdentity: string): Promise<Heroku.App[]> {
    const response = await this.heroku.get<Heroku.App[]>(`/users/${accountIdentity}/apps`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an existing app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async update(appIdentity: string, body: Heroku.AppUpdatePayload): Promise<Heroku.App> {
    const response = await this.heroku.patch<Heroku.App>(`/apps/${appIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Enable ACM flag for an app
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async enableAcm(appIdentity: string): Promise<Heroku.App> {
    const response = await this.heroku.post<Heroku.App>(`/apps/${appIdentity}/acm`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Disable ACM flag for an app
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async disableAcm(appIdentity: string): Promise<Heroku.App> {
    const response = await this.heroku.delete<Heroku.App>(`/apps/${appIdentity}/acm`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Refresh ACM for an app
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async refreshAcm(appIdentity: string): Promise<Heroku.App> {
    const response = await this.heroku.patch<Heroku.App>(`/apps/${appIdentity}/acm`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
