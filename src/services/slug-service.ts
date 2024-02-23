import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Slug](https://devcenter.heroku.com/articles/platform-api-reference#slug)
 * A slug is a snapshot of your application code that is ready to run on the platform.
 */
export default class SlugService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing slug.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param slugIdentity unique identifier of slug.
   */
  public async info(appIdentity: string, slugIdentity: string): Promise<Heroku.Slug> {
    const response = await this.heroku.get<Heroku.Slug>(`/apps/${appIdentity}/slugs/${slugIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create a new slug. For more information please refer to [Deploying Slugs using the Platform API](https://devcenter.heroku.com/articles/platform-api-deploying-slugs).
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.SlugCreatePayload): Promise<Heroku.Slug> {
    const response = await this.heroku.post<Heroku.Slug>(`/apps/${appIdentity}/slugs`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
