import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Feature](https://devcenter.heroku.com/articles/platform-api-reference#app-feature)
 * An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.
 */
export default class AppFeatureService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for an existing app feature.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, appFeatureIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppFeature>;
    /**
     * List existing app features.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppFeature[]>;
    /**
     * Update an existing app feature.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, appFeatureIdentity: string, payload: Heroku.AppFeatureUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AppFeature>;
}
