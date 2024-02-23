import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Review App](https://devcenter.heroku.com/articles/platform-api-reference#review-app)
 * An ephemeral app to review a set of changes
 */
export default class ReviewAppService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new review app
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.ReviewAppCreatePayload): Promise<Heroku.ReviewApp> {
    const response = await this.heroku.post<Heroku.ReviewApp>(`/review-apps`, {
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
  public async getReviewApp(reviewAppId: string): Promise<Heroku.ReviewApp> {
    const response = await this.heroku.get<Heroku.ReviewApp>(`/review-apps/${reviewAppId}`, {
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
  public async delete(reviewAppId: string): Promise<Heroku.ReviewApp> {
    const response = await this.heroku.delete<Heroku.ReviewApp>(`/review-apps/${reviewAppId}`, {
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
  public async getReviewAppByAppId(appIdentity: string): Promise<Heroku.ReviewApp> {
    const response = await this.heroku.get<Heroku.ReviewApp>(`/apps/${appIdentity}/review-app`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List review apps for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async list(pipelineId: string): Promise<Heroku.ReviewApp[]> {
    const response = await this.heroku.get<Heroku.ReviewApp[]>(`/pipelines/${pipelineId}/review-apps`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
