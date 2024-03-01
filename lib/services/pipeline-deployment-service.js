/**
 Heroku Platform API - Pipeline Deployment
Information about latest deployments of apps in a pipeline.

*/
export default class PipelineDeploymentService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List latest slug releases for each app in a pipeline
 *
 * @param pipelineId unique identifier of pipeline.
 */
    async list(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/latest-deployments`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
