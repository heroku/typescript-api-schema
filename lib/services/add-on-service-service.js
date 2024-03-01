/**
 Heroku Platform API - Add-on Service
Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.

*/
export default class AddOnServiceService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing add-on-service.
 *
 * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
 */
    async info(addOnServiceIdentity) {
        const response = await this.heroku.get(`/addon-services/${addOnServiceIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing add-on-services.
     *
     */
    async list() {
        const response = await this.heroku.get(`/addon-services`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
