/**
 Heroku Platform API - Pipeline Stack
A pipeline's stack is determined by the apps in the pipeline. This is used during creation of CI and Review Apps that have no stack defined in app.json

*/
export default class PipelineStackService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * The stack for a given pipeline, used for CI and Review Apps that have no stack defined in app.json.
 *
 * @param pipelineId unique identifier of pipeline.
 */
    async defaultStack(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/pipeline-stack`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
