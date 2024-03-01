/**
 Heroku Platform API - Slug
A slug is a snapshot of your application code that is ready to run on the platform.

*/
export default class SlugService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing slug.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param slugIdentity unique identifier of slug.
 */
    async info(appIdentity, slugIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/slugs/${slugIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a new slug. For more information please refer to [Deploying Slugs using the Platform API](https://devcenter.heroku.com/articles/platform-api-deploying-slugs).
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/slugs`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
