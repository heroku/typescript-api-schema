import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline](https://devcenter.heroku.com/articles/platform-api-reference#pipeline)
 * A pipeline allows grouping of apps into different stages.
 */
export default class PipelineService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * Create a new pipeline.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.PipelineCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Pipeline> {
    const response = await this.fetchImpl(`/pipelines`, {
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
      return (await response.json()) as Promise<Heroku.Pipeline>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing pipeline.
   *
   * @param pipelineIdentity unique identifier of pipeline or name of pipeline.
   * @param requestInit The initializer for the request.
   */
  public async info(
    pipelineIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Pipeline> {
    const response = await this.fetchImpl(`/pipelines/${pipelineIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Pipeline>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing pipeline.
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async delete(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Pipeline> {
    const response = await this.fetchImpl(`/pipelines/${pipelineId}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Pipeline>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update an existing pipeline.
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    pipelineId: string,
    payload: Heroku.PipelineUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Pipeline> {
    const response = await this.fetchImpl(`/pipelines/${pipelineId}`, {
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
      return (await response.json()) as Promise<Heroku.Pipeline>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing pipelines.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Pipeline[]> {
    const response = await this.fetchImpl(`/pipelines`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Pipeline[]>;
    }
    throw new Error(response.statusText);
  }
}
