/**
 Heroku Platform API - Dyno
Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).

*/
export default class DynoService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new dyno.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/dynos`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Restart dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     */
    async restart(appIdentity, dynoIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/dynos/${dynoIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Restart all dynos.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async restartAll(appIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/dynos`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Stop dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     */
    async stop(appIdentity, dynoIdentity) {
        const response = await this.heroku.post(`/apps/${appIdentity}/dynos/${dynoIdentity}/actions/stop`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     */
    async info(appIdentity, dynoIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/dynos/${dynoIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing dynos.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/dynos`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
