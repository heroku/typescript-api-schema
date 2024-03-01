import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Authorization](https://devcenter.heroku.com/articles/platform-api-reference#oauth-authorization)
* OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
*/
export default class OauthAuthorizationService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new OAuth authorization.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.OauthAuthorizationCreatePayload): Promise<Heroku.OauthAuthorization>;
    /**
     * Delete OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     */
    delete(oauthAuthorizationIdentity: string): Promise<Heroku.OauthAuthorization>;
    /**
     * Info for an OAuth authorization.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     */
    info(oauthAuthorizationIdentity: string): Promise<Heroku.OauthAuthorization>;
    /**
     * List OAuth authorizations.
     *
     */
    list(): Promise<Heroku.OauthAuthorization[]>;
    /**
     * Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients.
     *
     * @param oauthAuthorizationIdentity unique identifier of OAuth authorization.
     */
    regenerate(oauthAuthorizationIdentity: string): Promise<Heroku.OauthAuthorization>;
}
