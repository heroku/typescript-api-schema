import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Token](https://devcenter.heroku.com/articles/platform-api-reference#oauth-token)
* OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
*/
export default class OauthTokenService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new OAuth token.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.OauthTokenCreatePayload): Promise<Heroku.OauthToken>;
    /**
     * Revoke OAuth access token.
     *
     * @param oauthTokenIdentity unique identifier of OAuth token.
     */
    delete(oauthTokenIdentity: string): Promise<Heroku.OauthToken>;
}
