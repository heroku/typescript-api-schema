/**
 Heroku Platform API - Review App Configuration
Review apps can be configured for pipelines.

*/
export default class ReviewAppConfigService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Enable review apps for a pipeline
 *
 * @param pipelineId unique identifier of pipeline.
 * @param body Object to send to the endpoint.
 */
    async enable(pipelineId, body) {
        const response = await this.heroku.post(`/pipelines/${pipelineId}/review-app-config`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Get review apps configuration for a pipeline
     *
     * @param pipelineId unique identifier of pipeline.
     */
    async info(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/review-app-config`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update review app configuration for a pipeline
     *
     * @param pipelineId unique identifier of pipeline.
     * @param body Object to send to the endpoint.
     */
    async update(pipelineId, body) {
        const response = await this.heroku.patch(`/pipelines/${pipelineId}/review-app-config`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Disable review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline.
     */
    async delete(pipelineId) {
        const response = await this.heroku.delete(`/pipelines/${pipelineId}/review-app-config`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
