import type { APIClient } from '@heroku-cli/command';
/**
 * [Heroku Platform API - Pipeline Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-config-var)
* Pipeline Config Vars allow you to manage the configuration information provided to a pipeline.
*/
export default class PipelineConfigVarService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Get config-vars for a pipeline stage.
 *
 * @param pipelineId unique identifier of pipeline
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 * @param pipelineCouplingStage target pipeline stage
 * @example production.
 */
    infoForApp(pipelineId: string, pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production'): Promise<Record<string, unknown>>;
    /**
     * Update config-vars for a pipeline stage. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     * @param pipelineCouplingStage target pipeline stage
     * @example production.
     * @param body Object to send to the endpoint.
     */
    update(pipelineId: string, pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production', body: Record<string, unknown>): Promise<Record<string, unknown>>;
}
