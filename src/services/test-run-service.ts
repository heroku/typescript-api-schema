import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Test Run](https://devcenter.heroku.com/articles/platform-api-reference#test-run)
 * An execution or trial of one or more tests
 */
export default class TestRunService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new test-run.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.TestRunCreatePayload): Promise<void> {
    const response = await this.heroku.post<void>(`/test-runs`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing test-run.
   *
   * @param testRunId unique identifier of a test run.
   */
  public async info(testRunId: string): Promise<void> {
    const response = await this.heroku.get<void>(`/test-runs/${testRunId}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing test-runs for a pipeline.
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   */
  public async list(pipelineId: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.get<Record<string, unknown>>(`/pipelines/${pipelineId}/test-runs`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for existing test-run by Pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example 01234567-89ab-cdef-0123-456789abcdef.
   * @param testRunNumber the auto incrementing test run number.
   */
  public async infoByPipeline(pipelineId: string, testRunNumber: number): Promise<void> {
    const response = await this.heroku.get<void>(`/pipelines/${pipelineId}/test-runs/${testRunNumber}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update a test-run's status.
   *
   * @param testRunNumber the auto incrementing test run number.
   * @param body Object to send to the endpoint.
   */
  public async update(testRunNumber: number, body: Heroku.TestRunUpdatePayload): Promise<void> {
    const response = await this.heroku.patch<void>(`/test-runs/${testRunNumber}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
