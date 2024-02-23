/**
 Heroku Platform API - Source
A source is a location for uploading and downloading an application's source code.

*/
export default class SourceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create URLs for uploading and downloading source.
 *
 */
    async create() {
        const response = await this.heroku.post(`/sources`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Create URLs for uploading and downloading source. Deprecated in favor of `POST /sources`
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async createDeprecated(appIdentity) {
        const response = await this.heroku.post(`/apps/${appIdentity}/sources`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
