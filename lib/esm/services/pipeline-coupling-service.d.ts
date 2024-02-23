import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Coupling](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-coupling)
 * Information about an app's coupling to a pipeline
 */
export default class PipelineCouplingService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List couplings for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    listByPipeline(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling[]>;
    /**
     * List pipeline couplings for the current user.
     *
     * @param requestInit The initializer for the request.
     */
    listByCurrentUser(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling[]>;
    /**
     * List pipeline couplings.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling[]>;
    /**
     * List pipeline couplings for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    listByTeam(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling[]>;
    /**
     * Create a new pipeline coupling.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.PipelineCouplingCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling>;
    /**
     * Info for an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     * @param requestInit The initializer for the request.
     */
    info(pipelineCouplingIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling>;
    /**
     * Delete an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     * @param requestInit The initializer for the request.
     */
    delete(pipelineCouplingIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling>;
    /**
     * Update an existing pipeline coupling.
     *
     * @param pipelineCouplingIdentity unique identifier of pipeline coupling.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(pipelineCouplingIdentity: string, payload: Heroku.PipelineCouplingUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling>;
    /**
     * Info for an existing pipeline coupling.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    infoByApp(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineCoupling>;
}
