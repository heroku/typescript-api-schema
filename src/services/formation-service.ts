import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Formation](https://devcenter.heroku.com/articles/platform-api-reference#formation)
 * The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.
 */
export default class FormationService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for a process type
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param formationIdentity unique identifier of this process type or type of process to maintain.
   */
  public async info(appIdentity: string, formationIdentity: string): Promise<Heroku.Formation> {
    const response = await this.heroku.get<Heroku.Formation>(`/apps/${appIdentity}/formation/${formationIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List process type formation
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.Formation[]> {
    const response = await this.heroku.get<Heroku.Formation[]>(`/apps/${appIdentity}/formation`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Batch update process types
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async batchUpdate(appIdentity: string, body: Heroku.FormationBatchUpdatePayload): Promise<Heroku.Formation[]> {
    const response = await this.heroku.patch<Heroku.Formation[]>(`/apps/${appIdentity}/formation`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Update process type
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param formationIdentity unique identifier of this process type or type of process to maintain.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    formationIdentity: string,
    body: Heroku.FormationUpdatePayload
  ): Promise<Heroku.Formation> {
    const response = await this.heroku.patch<Heroku.Formation>(`/apps/${appIdentity}/formation/${formationIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
