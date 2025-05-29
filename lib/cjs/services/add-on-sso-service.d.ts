import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on SSO](https://devcenter.heroku.com/articles/platform-api-reference#add-on-sso)
 * Add-on Single Sign-on generates URL that allows a customer to log in to an Add-on Service's web dashboard.
 */
export default class AddOnSsoService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Generate a timestamp-based single sign-on URL.
     *
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    addOnSso(addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnSso>;
    /**
     * Generate a timestamp-based single sign-on URL.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
     * @param requestInit The initializer for the request.
     */
    addOnSsoByApp(appIdentity: string, addOnIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOnSso>;
}
