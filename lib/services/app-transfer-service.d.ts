import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Transfer](https://devcenter.heroku.com/articles/platform-api-reference#app-transfer)
* An app transfer represents a two party interaction for transferring ownership of an app.
*/
export default class AppTransferService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new app transfer.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.AppTransferCreatePayload): Promise<Heroku.AppTransfer>;
    /**
     * Delete an existing app transfer
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     */
    delete(appTransferIdentity: string): Promise<Heroku.AppTransfer>;
    /**
     * Info for existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     */
    info(appTransferIdentity: string): Promise<Heroku.AppTransfer>;
    /**
     * List existing apps transfers.
     *
     */
    list(): Promise<Heroku.AppTransfer[]>;
    /**
     * Update an existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param body Object to send to the endpoint.
     */
    update(appTransferIdentity: string, body: Heroku.AppTransferUpdatePayload): Promise<Heroku.AppTransfer>;
}
