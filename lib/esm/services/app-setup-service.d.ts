import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Setup API - App Setup](https://devcenter.heroku.com/articles/platform-api-reference#app-setup)
 * An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
 */
export default class AppSetupService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new app setup from a gzipped tar archive containing an app.json manifest file.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.AppSetupCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppSetup>;
    /**
     * Get the status of an app setup.
     *
     * @param appSetupIdentity unique identifier of app setup.
     * @param requestInit The initializer for the request.
     */
    info(appSetupIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppSetup>;
}
