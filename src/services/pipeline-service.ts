import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline](https://devcenter.heroku.com/articles/platform-api-reference#pipeline)
 * A pipeline allows grouping of apps into different stages.
 */
export default class PipelineService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new pipeline.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.PipelineCreatePayload): Promise<Heroku.Pipeline> {
    const response = await this.heroku.post<Heroku.Pipeline>(`/pipelines`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing pipeline.
   *
   * @param pipelineIdentity unique identifier of pipeline or name of pipeline.
   */
  public async info(pipelineIdentity: string): Promise<Heroku.Pipeline> {
    const response = await this.heroku.get<Heroku.Pipeline>(`/pipelines/${pipelineIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing pipeline.
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async delete(pipelineId: string): Promise<Heroku.Pipeline> {
    const response = await this.heroku.delete<Heroku.Pipeline>(`/pipelines/${pipelineId}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Update an existing pipeline.
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param body Object to send to the endpoint.
   */
  public async update(pipelineId: string, body: Heroku.PipelineUpdatePayload): Promise<Heroku.Pipeline> {
    const response = await this.heroku.patch<Heroku.Pipeline>(`/pipelines/${pipelineId}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * List existing pipelines.
   *
   */
  public async list(): Promise<Heroku.Pipeline[]> {
    const response = await this.heroku.get<Heroku.Pipeline[]>(`/pipelines`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
