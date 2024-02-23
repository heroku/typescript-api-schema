import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Buildpack Installations](https://devcenter.heroku.com/articles/platform-api-reference#buildpack-installation)
 * A buildpack installation represents a buildpack that will be run against an app.
 */
export default class BuildpackInstallationService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Update an app's buildpack installations.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, payload: Heroku.BuildpackInstallationUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.BuildpackInstallation[]>;
    /**
     * List an app's existing buildpack installations.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.BuildpackInstallation[]>;
}
