/**
 Heroku Platform API - Region
A region represents a geographic location in which your application may run.

*/
export default class RegionService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing region.
 *
 * @param regionIdentity unique identifier of region or unique name of region.
 */
    async info(regionIdentity) {
        const response = await this.heroku.get(`/regions/${regionIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing regions.
     *
     */
    async list() {
        const response = await this.heroku.get(`/regions`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
