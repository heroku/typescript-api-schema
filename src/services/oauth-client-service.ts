import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Client](https://devcenter.heroku.com/articles/platform-api-reference#oauth-client)
 * OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
 */
export default class OauthClientService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new OAuth client.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.OauthClientCreatePayload): Promise<Heroku.OauthClient> {
    const response = await this.heroku.post<Heroku.OauthClient>(`/oauth/clients`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete OAuth client.
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   */
  public async delete(oauthClientIdentity: string): Promise<Heroku.OauthClient> {
    const response = await this.heroku.delete<Heroku.OauthClient>(`/oauth/clients/${oauthClientIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for an OAuth client
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   */
  public async info(oauthClientIdentity: string): Promise<void> {
    const response = await this.heroku.get<void>(`/oauth/clients/${oauthClientIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List OAuth clients
   *
   */
  public async list(): Promise<Heroku.OauthClient[]> {
    const response = await this.heroku.get<Heroku.OauthClient[]>(`/oauth/clients`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update OAuth client
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   * @param body Object to send to the endpoint.
   */
  public async update(oauthClientIdentity: string, body: Heroku.OauthClientUpdatePayload): Promise<Heroku.OauthClient> {
    const response = await this.heroku.patch<Heroku.OauthClient>(`/oauth/clients/${oauthClientIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Rotate credentials for an OAuth client
   *
   * @param oauthClientIdentity unique identifier of this OAuth client.
   */
  public async rotateCredentials(oauthClientIdentity: string): Promise<Heroku.OauthClient> {
    const response = await this.heroku.post<Heroku.OauthClient>(
      `/oauth/clients/${oauthClientIdentity}/actions/rotate-credentials`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
