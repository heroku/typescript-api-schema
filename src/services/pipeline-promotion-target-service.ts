import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Promotion Target](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion-target)
 * Promotion targets represent an individual app being promoted to
 */
export default class PipelinePromotionTargetService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List promotion targets belonging to an existing promotion.
   *
   * @param pipelinePromotionId unique identifier of promotion
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async list(pipelinePromotionId: string): Promise<Heroku.PipelinePromotionTarget[]> {
    const response = await this.heroku.get<Heroku.PipelinePromotionTarget[]>(
      `/pipeline-promotions/${pipelinePromotionId}/promotion-targets`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
}
