import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Review App Configuration](https://devcenter.heroku.com/articles/platform-api-reference#review-app-config)
 * Review apps can be configured for pipelines.
 */
export default class ReviewAppConfigService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Enable review apps for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param body Object to send to the endpoint.
   */
  public async enable(pipelineId: string, body: Heroku.ReviewAppConfigEnablePayload): Promise<Heroku.ReviewAppConfig> {
    const response = await this.heroku.post<Heroku.ReviewAppConfig>(`/pipelines/${pipelineId}/review-app-config`, {
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
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async info(pipelineId: string): Promise<Heroku.ReviewAppConfig> {
    const response = await this.heroku.get<Heroku.ReviewAppConfig>(`/pipelines/${pipelineId}/review-app-config`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update review app configuration for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param body Object to send to the endpoint.
   */
  public async update(pipelineId: string, body: Heroku.ReviewAppConfigUpdatePayload): Promise<Heroku.ReviewAppConfig> {
    const response = await this.heroku.patch<Heroku.ReviewAppConfig>(`/pipelines/${pipelineId}/review-app-config`, {
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
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async delete(pipelineId: string): Promise<Heroku.ReviewAppConfig> {
    const response = await this.heroku.delete<Heroku.ReviewAppConfig>(`/pipelines/${pipelineId}/review-app-config`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
