import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Promotion Target](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion-target)
 * Promotion targets represent an individual app being promoted to
 */
export default class PipelinePromotionTargetService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List promotion targets belonging to an existing promotion.
   *
   * @param pipelinePromotionId unique identifier of promotion
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async list(
    pipelinePromotionId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelinePromotionTarget[]> {
    const response = await this.fetchImpl(
      `${this.endpoint}/pipeline-promotions/${pipelinePromotionId}/promotion-targets`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelinePromotionTarget[]>;
    }
    throw new Error(response.statusText);
  }
}
