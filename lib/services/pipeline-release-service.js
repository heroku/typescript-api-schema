/**
 Heroku Platform API - Pipeline Release
Information about latest releases of apps in a pipeline.

*/
export default class PipelineReleaseService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List latest releases for each app in a pipeline
 *
 * @param pipelineId unique identifier of pipeline.
 */
    async list(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/latest-releases`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
