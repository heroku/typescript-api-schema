import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on](https://devcenter.heroku.com/articles/platform-api-reference#add-on)
* Add-ons represent add-ons that have been provisioned and attached to one or more apps.
*/
export default class AddOnService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List all existing add-ons.
 *
 */
    list(): Promise<Heroku.AddOn[]>;
    /**
     * Info for an existing add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    info(addOnIdentity: string): Promise<Heroku.AddOn>;
    /**
     * Create a new add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    create(appIdentity: string, body: Heroku.AddOnCreatePayload): Promise<Heroku.AddOn>;
    /**
     * Delete an existing add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    delete(appIdentity: string, addOnIdentity: string): Promise<Heroku.AddOn>;
    /**
     * Info for an existing add-on.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    infoByApp(appIdentity: string, addOnIdentity: string): Promise<Heroku.AddOn>;
    /**
     * List existing add-ons for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    listByApp(appIdentity: string): Promise<Heroku.AddOn[]>;
    /**
     * Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, addOnIdentity: string, body: Heroku.AddOnUpdatePayload): Promise<Heroku.AddOn>;
    /**
     * List all existing add-ons a user has access to
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     */
    listByUser(accountIdentity: string): Promise<Heroku.AddOn[]>;
    /**
     * List add-ons used across all Team apps
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    listByTeam(teamIdentity: string): Promise<Heroku.AddOn[]>;
    /**
     * Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many.
     *
     * @param body Object to send to the endpoint.
     */
    resolution(body: Heroku.AddOnResolutionPayload): Promise<Heroku.AddOn[]>;
}
