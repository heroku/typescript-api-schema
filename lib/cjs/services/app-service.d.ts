import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App](https://devcenter.heroku.com/articles/platform-api-reference#app)
 * An app represents the program that you would like to deploy and run on Heroku.
 */
export default class AppService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new app.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.AppCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
    /**
     * Delete an existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
    /**
     * Info for existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
    /**
     * List existing apps.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App[]>;
    /**
     * List owned and collaborated apps (excludes team apps).
     *
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    listOwnedAndCollaborated(accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App[]>;
    /**
     * Update an existing app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, payload: Heroku.AppUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
    /**
     * Enable ACM flag for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    enableAcm(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
    /**
     * Disable ACM flag for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    disableAcm(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
    /**
     * Refresh ACM for an app
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    refreshAcm(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.App>;
}
