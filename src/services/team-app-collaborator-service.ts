import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#team-app-collaborator)
 * A team collaborator represents an account that has been given access to a team app on Heroku.
 */
export default class TeamAppCollaboratorService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(
    appIdentity: string,
    body: Heroku.TeamAppCollaboratorCreatePayload
  ): Promise<Heroku.TeamAppCollaborator> {
    const response = await this.heroku.post<Heroku.TeamAppCollaborator>(`/teams/apps/${appIdentity}/collaborators`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing collaborator from a team app.
   *
   * @param teamAppIdentity unique name of app.
   * @param teamAppCollaboratorIdentity invited email address of collaborator.
   */
  public async delete(
    teamAppIdentity: string,
    teamAppCollaboratorIdentity: string
  ): Promise<Heroku.TeamAppCollaborator> {
    const response = await this.heroku.delete<Heroku.TeamAppCollaborator>(
      `/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`,
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
   * Info for a collaborator on a team app.
   *
   * @param teamAppIdentity unique name of app.
   * @param teamAppCollaboratorIdentity invited email address of collaborator.
   */
  public async info(teamAppIdentity: string, teamAppCollaboratorIdentity: string): Promise<Heroku.TeamAppCollaborator> {
    const response = await this.heroku.get<Heroku.TeamAppCollaborator>(
      `/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Update an existing collaborator from a team app.
   *
   * @param teamAppIdentity unique name of app.
   * @param teamAppCollaboratorIdentity invited email address of collaborator.
   * @param body Object to send to the endpoint.
   */
  public async update(
    teamAppIdentity: string,
    teamAppCollaboratorIdentity: string,
    body: Heroku.TeamAppCollaboratorUpdatePayload
  ): Promise<Heroku.TeamAppCollaborator> {
    const response = await this.heroku.patch<Heroku.TeamAppCollaborator>(
      `/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * List collaborators on a team app.
   *
   * @param teamAppIdentity unique name of app.
   */
  public async list(teamAppIdentity: string): Promise<Heroku.TeamAppCollaborator[]> {
    const response = await this.heroku.get<Heroku.TeamAppCollaborator[]>(
      `/teams/apps/${teamAppIdentity}/collaborators`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
}
