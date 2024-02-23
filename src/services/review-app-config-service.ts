import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Review App Configuration](https://devcenter.heroku.com/articles/platform-api-reference#review-app-config)
 * Review apps can be configured for pipelines.
 */
export default class ReviewAppConfigService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Enable review apps for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async enable(
    pipelineId: string,
    payload: Heroku.ReviewAppConfigEnablePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewAppConfig> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/review-app-config`, {
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
      return (await response.json()) as Promise<Heroku.ReviewAppConfig>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Get review apps configuration for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async info(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewAppConfig> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/review-app-config`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewAppConfig>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update review app configuration for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    pipelineId: string,
    payload: Heroku.ReviewAppConfigUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewAppConfig> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/review-app-config`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewAppConfig>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Disable review apps for a pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async delete(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.ReviewAppConfig> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/review-app-config`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.ReviewAppConfig>;
    }
    throw new Error(response.statusText);
  }
}
