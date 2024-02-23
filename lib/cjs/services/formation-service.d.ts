import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Formation](https://devcenter.heroku.com/articles/platform-api-reference#formation)
 * The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.
 */
export default class FormationService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for a process type
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param formationIdentity unique identifier of this process type or type of process to maintain.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, formationIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Formation>;
    /**
     * List process type formation
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Formation[]>;
    /**
     * Batch update process types
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    batchUpdate(appIdentity: string, payload: Heroku.FormationBatchUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Formation[]>;
    /**
     * Update process type
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param formationIdentity unique identifier of this process type or type of process to maintain.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, formationIdentity: string, payload: Heroku.FormationUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Formation>;
}
