/**
 Heroku Platform API - Add-on Attachment
An add-on attachment represents a connection between an app and an add-on that it has been given access to.

*/
export default class AddOnAttachmentService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new add-on attachment.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/addon-attachments`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing add-on attachment.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     */
    async delete(addOnAttachmentIdentity) {
        const response = await this.heroku.delete(`/addon-attachments/${addOnAttachmentIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing add-on attachment.
     *
     * @param addOnAttachmentIdentity unique identifier of this add-on attachment.
     */
    async info(addOnAttachmentIdentity) {
        const response = await this.heroku.get(`/addon-attachments/${addOnAttachmentIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing add-on attachments.
     *
     */
    async list() {
        const response = await this.heroku.get(`/addon-attachments`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing add-on attachments for an add-on.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     */
    async listByAddOn(addOnIdentity) {
        const response = await this.heroku.get(`/addons/${addOnIdentity}/addon-attachments`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing add-on attachments for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async listByApp(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/addon-attachments`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info for existing add-on attachment for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnAttachmentScopedIdentity unique identifier of this add-on attachment or unique name for this add-on attachment to this app.
     */
    async infoByApp(appIdentity, addOnAttachmentScopedIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/addon-attachments/${addOnAttachmentScopedIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many.
     *
     * @param body Object to send to the endpoint.
     */
    async resolution(body) {
        const response = await this.heroku.post(`/actions/addon-attachments/resolve`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
