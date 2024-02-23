/**
 Heroku Platform API - Dyno Size
Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).

*/
export default class DynoSizeService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing dyno size.
 *
 * @param dynoSizeIdentity unique identifier of this dyno size or the name of this dyno-size.
 */
    async info(dynoSizeIdentity) {
        const response = await this.heroku.get(`/dyno-sizes/${dynoSizeIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing dyno sizes.
     *
     */
    async list() {
        const response = await this.heroku.get(`/dyno-sizes`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
