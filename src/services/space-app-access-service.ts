import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Access](https://devcenter.heroku.com/articles/platform-api-reference#space-app-access)
 * Space access represents the permissions a particular user has on a particular space.
 */
export default class SpaceAppAccessService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List permissions for a given user on a given space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   */
  public async info(spaceIdentity: string, accountIdentity: string): Promise<Heroku.SpaceAppAccess> {
    const response = await this.heroku.get<Heroku.SpaceAppAccess>(
      `/spaces/${spaceIdentity}/members/${accountIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Update an existing user's set of permissions on a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
   * @param body Object to send to the endpoint.
   */
  public async update(
    spaceIdentity: string,
    accountIdentity: string,
    body: Heroku.SpaceAppAccessUpdatePayload
  ): Promise<Heroku.SpaceAppAccess> {
    const response = await this.heroku.patch<Heroku.SpaceAppAccess>(
      `/spaces/${spaceIdentity}/members/${accountIdentity}`,
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
   * List all users and their permissions on a space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async list(spaceIdentity: string): Promise<Heroku.SpaceAppAccess[]> {
    const response = await this.heroku.get<Heroku.SpaceAppAccess[]>(`/spaces/${spaceIdentity}/members`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
