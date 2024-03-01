/**
 Heroku Platform API - Pipeline Build
Information about latest builds of apps in a pipeline.

*/
export default class PipelineBuildService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List latest builds for each app in a pipeline
 *
 * @param pipelineId unique identifier of pipeline.
 */
    async list(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/latest-builds`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
