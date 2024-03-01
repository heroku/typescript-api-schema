import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Region](https://devcenter.heroku.com/articles/platform-api-reference#region)
* A region represents a geographic location in which your application may run.
*/
export default class RegionService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing region.
 *
 * @param regionIdentity unique identifier of region or unique name of region.
 */
    info(regionIdentity: string): Promise<Heroku.Region>;
    /**
     * List existing regions.
     *
     */
    list(): Promise<Heroku.Region[]>;
}
