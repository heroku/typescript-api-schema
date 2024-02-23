import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Authorization](https://devcenter.heroku.com/articles/platform-api-reference#oauth-authorization)
 * OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
 */
export default class OauthAuthorizationService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new OAuth authorization.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.OauthAuthorizationCreatePayload): Promise<Heroku.OauthAuthorization> {
    const response = await this.heroku.post<Heroku.OauthAuthorization>(`/oauth/authorizations`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete OAuth authorization.
   *
   * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
   */
  public async delete(oauthAuthorizationIdentity: string): Promise<Heroku.OauthAuthorization> {
    const response = await this.heroku.delete<Heroku.OauthAuthorization>(
      `/oauth/authorizations/${oauthAuthorizationIdentity}`,
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
   * Info for an OAuth authorization.
   *
   * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
   */
  public async info(oauthAuthorizationIdentity: string): Promise<Heroku.OauthAuthorization> {
    const response = await this.heroku.get<Heroku.OauthAuthorization>(
      `/oauth/authorizations/${oauthAuthorizationIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List OAuth authorizations.
   *
   */
  public async list(): Promise<Heroku.OauthAuthorization[]> {
    const response = await this.heroku.get<Heroku.OauthAuthorization[]>(`/oauth/authorizations`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients.
   *
   * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
   */
  public async regenerate(oauthAuthorizationIdentity: string): Promise<Heroku.OauthAuthorization> {
    const response = await this.heroku.post<Heroku.OauthAuthorization>(
      `/oauth/authorizations/${oauthAuthorizationIdentity}/actions/regenerate-tokens`,
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
