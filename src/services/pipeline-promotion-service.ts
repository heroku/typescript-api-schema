import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Promotion](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion)
 * Promotions allow you to move code from an app in a pipeline to all targets
 */
export default class PipelinePromotionService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new promotion.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.PipelinePromotionCreatePayload): Promise<Heroku.PipelinePromotion> {
    const response = await this.heroku.post<Heroku.PipelinePromotion>(`/pipeline-promotions`, {
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
  public async info(pipelinePromotionIdentity: string): Promise<Heroku.PipelinePromotion> {
    const response = await this.heroku.get<Heroku.PipelinePromotion>(
      `/pipeline-promotions/${pipelinePromotionIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
}
