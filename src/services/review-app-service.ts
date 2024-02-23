import * as Heroku from '@heroku-cli/schema';
/**
 * [Review App](https://devcenter.heroku.com/articles/platform-api-reference#review-app)
 * An ephemeral app to review a set of changes
 */
export default class ReviewAppService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new review app
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.ReviewAppCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewApp> {
    const response = await this.fetchImpl(`${this.endpoint}/review-apps`, {
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
      return (await response.json()) as Promise<Heroku.ReviewApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Gets an existing review app
   *
   * @param reviewAppId unique identifier of the review app.
   * @param requestInit The initializer for the request.
   */
  public async getReviewApp(
    reviewAppId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewApp> {
    const response = await this.fetchImpl(`${this.endpoint}/review-apps/${reviewAppId}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing review app
   *
   * @param reviewAppId unique identifier of the review app.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    reviewAppId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewApp> {
    const response = await this.fetchImpl(`${this.endpoint}/review-apps/${reviewAppId}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Get a review app using the associated app_id
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async getReviewAppByAppId(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewApp> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/review-app`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewApp>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List review apps for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async list(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewApp[]> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/review-apps`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewApp[]>;
    }
    throw new Error(response.statusText);
  }
}
