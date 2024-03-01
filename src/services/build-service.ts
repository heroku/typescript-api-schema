import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Build API - Build](https://devcenter.heroku.com/articles/platform-api-reference#build)
 * A build represents the process of transforming a code tarball into a slug
 */
export default class BuildService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.BuildCreatePayload): Promise<Heroku.Build> {
    const response = await this.heroku.post<Heroku.Build>(`/apps/${appIdentity}/builds`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param buildIdentity unique identifier of build.
   */
  public async info(appIdentity: string, buildIdentity: string): Promise<Heroku.Build> {
    const response = await this.heroku.get<Heroku.Build>(`/apps/${appIdentity}/builds/${buildIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.Build[]> {
    const response = await this.heroku.get<Heroku.Build[]>(`/apps/${appIdentity}/builds`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Destroy a build cache.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async deleteCache(appIdentity: string): Promise<void> {
    const response = await this.heroku.delete<void>(`/apps/${appIdentity}/build-cache`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Cancel running build.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param buildIdentity unique identifier of build.
   */
  public async cancel(appIdentity: string, buildIdentity: string): Promise<Heroku.Build> {
    const response = await this.heroku.delete<Heroku.Build>(`/apps/${appIdentity}/builds/${buildIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
