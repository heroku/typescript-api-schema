import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Release](https://devcenter.heroku.com/articles/platform-api-reference#release)
* A release represents a combination of code, config vars and add-ons for an app on Heroku.
*/
export default class ReleaseService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing release.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param releaseIdentity unique identifier of release or unique version assigned to the release.
 */
    info(appIdentity: string, releaseIdentity: string | number): Promise<Heroku.Release>;
    /**
     * List existing releases.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.Release[]>;
    /**
     * Create new release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    create(appIdentity: string, body: Heroku.ReleaseCreatePayload): Promise<Heroku.Release>;
    /**
     * Rollback to an existing release.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    rollback(appIdentity: string, body: Heroku.ReleaseRollbackPayload): Promise<Heroku.Release>;
}
