/**
 Heroku Platform API - Pipeline Config Vars
Pipeline Config Vars allow you to manage the configuration information provided to a pipeline.

*/
export default class PipelineConfigVarService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Get config-vars for a pipeline stage.
 *
 * @param pipelineId unique identifier of pipeline.
 * @param pipelineCouplingStage target pipeline stage.
 */
    async infoForApp(pipelineId, pipelineCouplingStage) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/stage/${pipelineCouplingStage}/config-vars`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update config-vars for a pipeline stage. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param pipelineId unique identifier of pipeline.
     * @param pipelineCouplingStage target pipeline stage.
     * @param body Object to send to the endpoint.
     */
    async update(pipelineId, pipelineCouplingStage, body) {
        const response = await this.heroku.patch(`/pipelines/${pipelineId}/stage/${pipelineCouplingStage}/config-vars`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
