/**
 Heroku Platform API - Pipeline Promotion Target
Promotion targets represent an individual app being promoted to

*/
export default class PipelinePromotionTargetService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List promotion targets belonging to an existing promotion.
 *
 * @param pipelinePromotionId unique identifier of promotion.
 */
    async list(pipelinePromotionId) {
        const response = await this.heroku.get(`/pipeline-promotions/${pipelinePromotionId}/promotion-targets`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
