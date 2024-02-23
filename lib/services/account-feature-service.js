/**
 Heroku Platform API - Account Feature
An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.

*/
export default class AccountFeatureService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for an existing account feature.
 *
 * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
 */
    async info(accountFeatureIdentity) {
        const response = await this.heroku.get(`/account/features/${accountFeatureIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing account features.
     *
     */
    async list() {
        const response = await this.heroku.get(`/account/features`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing account feature.
     *
     * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
     * @param body Object to send to the endpoint.
     */
    async update(accountFeatureIdentity, body) {
        const response = await this.heroku.patch(`/account/features/${accountFeatureIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
