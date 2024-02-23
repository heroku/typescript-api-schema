import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Source](https://devcenter.heroku.com/articles/platform-api-reference#source)
* A source is a location for uploading and downloading an application's source code.
*/
export default class SourceService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create URLs for uploading and downloading source.
 *
 */
    create(): Promise<Heroku.Source>;
    /**
     * Create URLs for uploading and downloading source. Deprecated in favor of `POST /sources`
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    createDeprecated(appIdentity: string): Promise<Heroku.Source>;
}
