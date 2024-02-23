import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Action](https://devcenter.heroku.com/articles/platform-api-reference#add-on-action)
* Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
*/
export default class AddOnActionService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Mark an add-on as provisioned for use.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 */
    provision(addOnIdentity: string): Promise<Heroku.AddOn>;
    /**
     * Mark an add-on as deprovisioned.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    deprovision(addOnIdentity: string): Promise<Heroku.AddOn>;
}
