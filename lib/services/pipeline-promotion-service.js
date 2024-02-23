/**
 Heroku Platform API - Pipeline Promotion
Promotions allow you to move code from an app in a pipeline to all targets

*/
export default class PipelinePromotionService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new promotion.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/pipeline-promotions`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing pipeline promotion.
     *
     * @param pipelinePromotionIdentity unique identifier of promotion.
     */
    async info(pipelinePromotionIdentity) {
        const response = await this.heroku.get(`/pipeline-promotions/${pipelinePromotionIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
