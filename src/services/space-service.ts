import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space](https://devcenter.heroku.com/articles/platform-api-reference#space)
 * A space is an isolated, highly available, secure app execution environment.
 */
export default class SpaceService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List existing spaces.
   *
   */
  public async list(): Promise<Heroku.Space[]> {
    const response = await this.heroku.get<Heroku.Space[]>(`/spaces`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for existing space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async info(spaceIdentity: string): Promise<Heroku.Space> {
    const response = await this.heroku.get<Heroku.Space>(`/spaces/${spaceIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an existing space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param body Object to send to the endpoint.
   */
  public async update(spaceIdentity: string, body: Heroku.SpaceUpdatePayload): Promise<Heroku.Space> {
    const response = await this.heroku.patch<Heroku.Space>(`/spaces/${spaceIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async delete(spaceIdentity: string): Promise<Heroku.Space> {
    const response = await this.heroku.delete<Heroku.Space>(`/spaces/${spaceIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Create a new space.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.SpaceCreatePayload): Promise<Heroku.Space> {
    const response = await this.heroku.post<Heroku.Space>(`/spaces`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
