/**
 * [Heroku Platform API - Pipeline Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-config-var)
 * Pipeline config vars in Heroku CI and review apps used to manage the configuration information for a pipeline.
 */
export default class PipelineConfigVarService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Get config-vars for a pipeline stage.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param pipelineCouplingStage target pipeline stage
     * @example "production".
     * @param requestInit The initializer for the request.
     */
    infoForApp(pipelineId: string, pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production', requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Update config-vars for a pipeline stage. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param pipelineCouplingStage target pipeline stage
     * @example "production".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(pipelineId: string, pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production', payload: Record<string, unknown>, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
}
