import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Processes Inside Dynos](https://devcenter.heroku.com/articles/platform-api-reference#dyno-processes)
 * Run processes inside existing dynos.
 */
export default class DynoProcessesService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new process in an existing dyno.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, dynoIdentity: string, payload: Heroku.DynoProcessesCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.DynoProcesses>;
}
