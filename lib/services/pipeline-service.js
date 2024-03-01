/**
 Heroku Platform API - Pipeline
A pipeline allows grouping of apps into different stages.

*/
export default class PipelineService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new pipeline.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/pipelines`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing pipeline.
     *
     * @param pipelineIdentity unique identifier of pipeline or name of pipeline.
     */
    async info(pipelineIdentity) {
        const response = await this.heroku.get(`/pipelines/${pipelineIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing pipeline.
     *
     * @param pipelineId unique identifier of pipeline.
     */
    async delete(pipelineId) {
        const response = await this.heroku.delete(`/pipelines/${pipelineId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Update an existing pipeline.
     *
     * @param pipelineId unique identifier of pipeline.
     * @param body Object to send to the endpoint.
     */
    async update(pipelineId, body) {
        const response = await this.heroku.patch(`/pipelines/${pipelineId}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List existing pipelines.
     *
     */
    async list() {
        const response = await this.heroku.get(`/pipelines`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
