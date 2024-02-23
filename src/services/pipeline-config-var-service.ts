import type { APIClient } from '@heroku-cli/command';
/**
 * [Heroku Platform API - Pipeline Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-config-var)
 * Pipeline Config Vars allow you to manage the configuration information provided to a pipeline.
 */
export default class PipelineConfigVarService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Get config-vars for a pipeline stage.
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param pipelineCouplingStage target pipeline stage
   * @example production.
   */
  public async infoForApp(
    pipelineId: string,
    pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production'
  ): Promise<Record<string, unknown>> {
    const response = await this.heroku.get<Record<string, unknown>>(
      `/pipelines/${pipelineId}/stage/${pipelineCouplingStage}/config-vars`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Update config-vars for a pipeline stage. You can update existing config-vars by setting them again, and remove by setting it to `null`.
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param pipelineCouplingStage target pipeline stage
   * @example production.
   * @param body Object to send to the endpoint.
   */
  public async update(
    pipelineId: string,
    pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production',
    body: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const response = await this.heroku.patch<Record<string, unknown>>(
      `/pipelines/${pipelineId}/stage/${pipelineCouplingStage}/config-vars`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
