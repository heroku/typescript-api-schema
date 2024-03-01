/**
 Heroku Platform API - Add-on Config
Configuration of an Add-on

*/
export default class AddOnConfigService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Get an add-on's config. Accessible by customers with access and by the add-on partner providing this add-on.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 */
    async list(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/config`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an add-on's config. Can only be accessed by the add-on partner providing this add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param body Object to send to the endpoint.
     */
    async update(addOnIdentity, body) {
        const response = await this.heroku.patch(`/addons/${addOnIdentity}/config`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
