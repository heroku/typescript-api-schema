import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#collaborator)
 * A collaborator represents an account that has been given access to an app on Heroku.
 */
export default class CollaboratorService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new collaborator.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.CollaboratorCreatePayload): Promise<Heroku.Collaborator> {
    const response = await this.heroku.post<Heroku.Collaborator>(`/apps/${appIdentity}/collaborators`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing collaborator.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
   */
  public async delete(appIdentity: string, collaboratorIdentity: string): Promise<Heroku.Collaborator> {
    const response = await this.heroku.delete<Heroku.Collaborator>(
      `/apps/${appIdentity}/collaborators/${collaboratorIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * Info for existing collaborator.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
   */
  public async info(appIdentity: string, collaboratorIdentity: string): Promise<Heroku.Collaborator> {
    const response = await this.heroku.get<Heroku.Collaborator>(
      `/apps/${appIdentity}/collaborators/${collaboratorIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing collaborators.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.Collaborator[]> {
    const response = await this.heroku.get<Heroku.Collaborator[]>(`/apps/${appIdentity}/collaborators`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
