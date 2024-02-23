import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Promotion](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-promotion)
 * Promotions allow you to move code from an app in a pipeline to all targets
 */
export default class PipelinePromotionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new promotion.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.PipelinePromotionCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelinePromotion> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-promotions`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelinePromotion>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing pipeline promotion.
   *
   * @param pipelinePromotionIdentity unique identifier of promotion.
   * @param requestInit The initializer for the request.
   */
  public async info(
    pipelinePromotionIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelinePromotion> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-promotions/${pipelinePromotionIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelinePromotion>;
    }
    throw new Error(response.statusText);
  }
}
