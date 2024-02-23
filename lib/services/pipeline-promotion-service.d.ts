import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Promotion](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion)
* Promotions allow you to move code from an app in a pipeline to all targets
*/
export default class PipelinePromotionService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new promotion.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.PipelinePromotionCreatePayload): Promise<Heroku.PipelinePromotion>;
    /**
     * Info for existing pipeline promotion.
     *
     * @param pipelinePromotionIdentity unique identifier of promotion.
     */
    info(pipelinePromotionIdentity: string): Promise<Heroku.PipelinePromotion>;
}
