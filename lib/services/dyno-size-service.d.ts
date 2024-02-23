import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Dyno Size](https://devcenter.heroku.com/articles/platform-api-reference#dyno-size)
* Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
*/
export default class DynoSizeService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing dyno size.
 *
 * @param dynoSizeIdentity unique identifier of this dyno size or the name of this dyno-size.
 */
    info(dynoSizeIdentity: string): Promise<Heroku.DynoSize>;
    /**
     * List existing dyno sizes.
     *
     */
    list(): Promise<Heroku.DynoSize[]>;
}
