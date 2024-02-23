import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline](https://devcenter.heroku.com/articles/platform-api-reference#pipeline)
 * A pipeline allows grouping of apps into different stages.
 */
export default class PipelineService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new pipeline.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.PipelineCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Pipeline>;
    /**
     * Info for existing pipeline.
     *
     * @param pipelineIdentity unique identifier of pipeline or name of pipeline.
     * @param requestInit The initializer for the request.
     */
    info(pipelineIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Pipeline>;
    /**
     * Delete an existing pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    delete(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Pipeline>;
    /**
     * Update an existing pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(pipelineId: string, payload: Heroku.PipelineUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Pipeline>;
    /**
     * List existing pipelines.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Pipeline[]>;
}
