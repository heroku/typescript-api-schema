import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - OAuth Client](https://devcenter.heroku.com/articles/platform-api-reference#oauth-client)
* OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
*/
export default class OauthClientService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new OAuth client.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.OauthClientCreatePayload): Promise<Heroku.OauthClient>;
    /**
     * Delete OAuth client.
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     */
    delete(oauthClientIdentity: string): Promise<Heroku.OauthClient>;
    /**
     * Info for an OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     */
    info(oauthClientIdentity: string): Promise<void>;
    /**
     * List OAuth clients
     *
     */
    list(): Promise<Heroku.OauthClient[]>;
    /**
     * Update OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     * @param body Object to send to the endpoint.
     */
    update(oauthClientIdentity: string, body: Heroku.OauthClientUpdatePayload): Promise<Heroku.OauthClient>;
    /**
     * Rotate credentials for an OAuth client
     *
     * @param oauthClientIdentity unique identifier of this OAuth client.
     */
    rotateCredentials(oauthClientIdentity: string): Promise<Heroku.OauthClient>;
}
