import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#add-on-service)
* Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.
*/
export default class AddOnServiceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing add-on-service.
 *
 * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
 */
    info(addOnServiceIdentity: string): Promise<Heroku.AddOnService>;
    /**
     * List existing add-on-services.
     *
     */
    list(): Promise<Heroku.AddOnService[]>;
}
