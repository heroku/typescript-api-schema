import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Setup API - App Setup](https://devcenter.heroku.com/articles/platform-api-reference#app-setup)
* An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
*/
export default class AppSetupService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new app setup from a gzipped tar archive containing an app.json manifest file.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.AppSetupCreatePayload): Promise<Heroku.AppSetup>;
    /**
     * Get the status of an app setup.
     *
     * @param appSetupIdentity unique identifier of app setup.
     */
    info(appSetupIdentity: string): Promise<Heroku.AppSetup>;
}
