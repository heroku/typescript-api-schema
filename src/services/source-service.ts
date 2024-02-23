import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Source](https://devcenter.heroku.com/articles/platform-api-reference#source)
 * A source is a location for uploading and downloading an application's source code.
 */
export default class SourceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create URLs for uploading and downloading source.
   *
   */
  public async create(): Promise<Heroku.Source> {
    const response = await this.heroku.post<Heroku.Source>(`/sources`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Create URLs for uploading and downloading source. Deprecated in favor of `POST /sources`
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async createDeprecated(appIdentity: string): Promise<Heroku.Source> {
    const response = await this.heroku.post<Heroku.Source>(`/apps/${appIdentity}/sources`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
