import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App](https://devcenter.heroku.com/articles/platform-api-reference#app)
* An app represents the program that you would like to deploy and run on Heroku.
*/
export default class AppService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new app.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.AppCreatePayload): Promise<Heroku.App>;
    /**
     * Delete an existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    delete(appIdentity: string): Promise<Heroku.App>;
    /**
     * Info for existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    info(appIdentity: string): Promise<Heroku.App>;
    /**
     * List existing apps.
     *
     */
    list(): Promise<Heroku.App[]>;
    /**
     * List owned and collaborated apps (excludes team apps).
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    listOwnedAndCollaborated(accountIdentity: string): Promise<Heroku.App[]>;
    /**
     * Update an existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, body: Heroku.AppUpdatePayload): Promise<Heroku.App>;
    /**
     * Enable ACM flag for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    enableAcm(appIdentity: string): Promise<Heroku.App>;
    /**
     * Disable ACM flag for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    disableAcm(appIdentity: string): Promise<Heroku.App>;
    /**
     * Refresh ACM for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    refreshAcm(appIdentity: string): Promise<Heroku.App>;
}
