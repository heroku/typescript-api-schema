import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Release](https://devcenter.heroku.com/articles/platform-api-reference#release)
 * A release represents a combination of code, config vars and add-ons for an app on Heroku.
 */
export default class ReleaseService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param releaseIdentity unique identifier of release or unique version assigned to the release.
   */
  public async info(appIdentity: string, releaseIdentity: string | number): Promise<Heroku.Release> {
    const response = await this.heroku.get<Heroku.Release>(`/apps/${appIdentity}/releases/${releaseIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing releases.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.Release[]> {
    const response = await this.heroku.get<Heroku.Release[]>(`/apps/${appIdentity}/releases`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create new release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.ReleaseCreatePayload): Promise<Heroku.Release> {
    const response = await this.heroku.post<Heroku.Release>(`/apps/${appIdentity}/releases`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Rollback to an existing release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async rollback(appIdentity: string, body: Heroku.ReleaseRollbackPayload): Promise<Heroku.Release> {
    const response = await this.heroku.post<Heroku.Release>(`/apps/${appIdentity}/releases`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
