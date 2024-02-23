import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Promotion](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion)
 * Promotions allow you to move code from an app in a pipeline to all targets
 */
export default class PipelinePromotionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new promotion.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.PipelinePromotionCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelinePromotion>;
    /**
     * Info for existing pipeline promotion.
     *
     * @param pipelinePromotionIdentity unique identifier of promotion.
     * @param requestInit The initializer for the request.
     */
    info(pipelinePromotionIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelinePromotion>;
}
