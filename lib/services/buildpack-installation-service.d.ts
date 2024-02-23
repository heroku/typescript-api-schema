import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Buildpack Installations](https://devcenter.heroku.com/articles/platform-api-reference#buildpack-installation)
* A buildpack installation represents a buildpack that will be run against an app.
*/
export default class BuildpackInstallationService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Update an app's buildpack installations.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    update(appIdentity: string, body: Heroku.BuildpackInstallationUpdatePayload): Promise<Heroku.BuildpackInstallation[]>;
    /**
     * List an app's existing buildpack installations.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.BuildpackInstallation[]>;
}
