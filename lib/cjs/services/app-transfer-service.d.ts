import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Transfer](https://devcenter.heroku.com/articles/platform-api-reference#app-transfer)
 * An app transfer represents a two party interaction for transferring ownership of an app.
 */
export default class AppTransferService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new app transfer.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.AppTransferCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppTransfer>;
    /**
     * Delete an existing app transfer
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param requestInit The initializer for the request.
     */
    delete(appTransferIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppTransfer>;
    /**
     * Info for existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param requestInit The initializer for the request.
     */
    info(appTransferIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppTransfer>;
    /**
     * List existing apps transfers.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppTransfer[]>;
    /**
     * Update an existing app transfer.
     *
     * @param appTransferIdentity unique identifier of app transfer or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appTransferIdentity: string, payload: Heroku.AppTransferUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppTransfer>;
}
