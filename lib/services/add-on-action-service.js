/**
 Heroku Platform API - Add-on Action
Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.

*/
export default class AddOnActionService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Mark an add-on as provisioned for use.
 *
 * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
 */
    async provision(addOnIdentity) {
        const response = await this.heroku.post(`/addons/${addOnIdentity}/actions/provision`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Mark an add-on as deprovisioned.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async deprovision(addOnIdentity) {
        const response = await this.heroku.post(`/addons/${addOnIdentity}/actions/deprovision`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
