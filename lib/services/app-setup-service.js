/**
 Heroku Setup API - App Setup
An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.

*/
export default class AppSetupService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new app setup from a gzipped tar archive containing an app.json manifest file.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/app-setups`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Get the status of an app setup.
     *
     * @param appSetupIdentity unique identifier of app setup.
     */
    async info(appSetupIdentity) {
        const response = await this.heroku.get(`/app-setups/${appSetupIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
