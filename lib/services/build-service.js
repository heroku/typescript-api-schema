/**
 Heroku Build API - Build
A build represents the process of transforming a code tarball into a slug

*/
export default class BuildService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new build.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/builds`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param buildIdentity unique identifier of build.
     */
    async info(appIdentity, buildIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/builds/${buildIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/builds`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Destroy a build cache.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async deleteCache(appIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/build-cache`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Cancel running build.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param buildIdentity unique identifier of build.
     */
    async cancel(appIdentity, buildIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/builds/${buildIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
