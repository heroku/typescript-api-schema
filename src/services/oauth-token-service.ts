import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Token](https://devcenter.heroku.com/articles/platform-api-reference#oauth-token)
 * OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthTokenService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new OAuth token.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.OauthTokenCreatePayload): Promise<Heroku.OauthToken> {
    const response = await this.heroku.post<Heroku.OauthToken>(`/oauth/tokens`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Revoke OAuth access token.
   *
   * @param oauthTokenIdentity unique identifier of OAuth token.
   */
  public async delete(oauthTokenIdentity: string): Promise<Heroku.OauthToken> {
    const response = await this.heroku.delete<Heroku.OauthToken>(`/oauth/tokens/${oauthTokenIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
