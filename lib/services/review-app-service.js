/**
 Review App
An ephemeral app to review a set of changes

*/
export default class ReviewAppService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new review app
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/review-apps`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Gets an existing review app
     *
     * @param reviewAppId unique identifier of the review app.
     */
    async getReviewApp(reviewAppId) {
        const response = await this.heroku.get(`/review-apps/${reviewAppId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing review app
     *
     * @param reviewAppId unique identifier of the review app.
     */
    async delete(reviewAppId) {
        const response = await this.heroku.delete(`/review-apps/${reviewAppId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Get a review app using the associated app_id
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async getReviewAppByAppId(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/review-app`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline.
     */
    async list(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/review-apps`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
