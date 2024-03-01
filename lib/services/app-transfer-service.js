/**
 Heroku Platform API - App Transfer
An app transfer represents a two party interaction for transferring ownership of an app.

*/
export default class AppTransferService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new app transfer.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/account/app-transfers`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing app transfer
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     */
    async delete(appTransferIdentity) {
        const response = await this.heroku.delete(`/account/app-transfers/${appTransferIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     */
    async info(appTransferIdentity) {
        const response = await this.heroku.get(`/account/app-transfers/${appTransferIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing apps transfers.
     *
     */
    async list() {
        const response = await this.heroku.get(`/account/app-transfers`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param body Object to send to the endpoint.
     */
    async update(appTransferIdentity, body) {
        const response = await this.heroku.patch(`/account/app-transfers/${appTransferIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
