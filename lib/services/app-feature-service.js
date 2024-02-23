/**
 Heroku Platform API - App Feature
An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.

*/
export default class AppFeatureService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for an existing app feature.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
 */
    async info(appIdentity, appFeatureIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/features/${appFeatureIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing app features.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/features`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing app feature.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, appFeatureIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/features/${appFeatureIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
