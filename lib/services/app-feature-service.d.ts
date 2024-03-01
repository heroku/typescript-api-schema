import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Feature](https://devcenter.heroku.com/articles/platform-api-reference#app-feature)
* An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.
*/
export default class AppFeatureService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for an existing app feature.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
 */
    info(appIdentity: string, appFeatureIdentity: string): Promise<Heroku.AppFeature>;
    /**
     * List existing app features.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.AppFeature[]>;
    /**
     * Update an existing app feature.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, appFeatureIdentity: string, body: Heroku.AppFeatureUpdatePayload): Promise<Heroku.AppFeature>;
}
