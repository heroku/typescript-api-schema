import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Config](https://devcenter.heroku.com/articles/platform-api-reference#add-on-config)
* Configuration of an Add-on
*/
export default class AddOnConfigService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Get an add-on's config. Accessible by customers with access and by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 */
    list(addOnIdentity: string): Promise<Heroku.AddOnConfig[]>;
    /**
     * Update an add-on's config. Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param body Object to send to the endpoint.
     */
    update(addOnIdentity: string, body: Heroku.AddOnConfigUpdatePayload): Promise<Heroku.AddOnConfig[]>;
}
