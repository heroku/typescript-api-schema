import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Build API - Build](https://devcenter.heroku.com/articles/platform-api-reference#build)
* A build represents the process of transforming a code tarball into a slug
*/
export default class BuildService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new build.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.BuildCreatePayload): Promise<Heroku.Build>;
    /**
     * Info for existing build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param buildIdentity unique identifier of build.
     */
    info(appIdentity: string, buildIdentity: string): Promise<Heroku.Build>;
    /**
     * List existing build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.Build[]>;
    /**
     * Destroy a build cache.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    deleteCache(appIdentity: string): Promise<void>;
    /**
     * Cancel running build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param buildIdentity unique identifier of build.
     */
    cancel(appIdentity: string, buildIdentity: string): Promise<Heroku.Build>;
}
