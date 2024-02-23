import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Session](https://devcenter.heroku.com/articles/platform-api-reference#log-session)
* A log session is a reference to the http based log stream for an app.
*/
export default class LogSessionService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new log session.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.LogSessionCreatePayload): Promise<Heroku.LogSession>;
}
