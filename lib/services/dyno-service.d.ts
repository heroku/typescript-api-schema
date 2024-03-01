import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Dyno](https://devcenter.heroku.com/articles/platform-api-reference#dyno)
* Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
*/
export default class DynoService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new dyno.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.DynoCreatePayload): Promise<Heroku.Dyno>;
    /**
     * Restart dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     */
    restart(appIdentity: string, dynoIdentity: string): Promise<Record<string, unknown>>;
    /**
     * Restart all dynos.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    restartAll(appIdentity: string): Promise<Record<string, unknown>>;
    /**
     * Stop dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     */
    stop(appIdentity: string, dynoIdentity: string): Promise<Record<string, unknown>>;
    /**
     * Info for existing dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     */
    info(appIdentity: string, dynoIdentity: string): Promise<Heroku.Dyno>;
    /**
     * List existing dynos.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.Dyno[]>;
}
