import * as Heroku from '@heroku-cli/schema';
/**
 * [Test Run](https://devcenter.heroku.com/articles/platform-api-reference#test-run)
 * An execution or trial of one or more tests
 */
export default class TestRunService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new test-run.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.TestRunCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/test-runs`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
  }
  /**
   * Info for existing test-run.
   *
   * @param testRunId unique identifier of a test run.
   * @param requestInit The initializer for the request.
   */
  public async info(testRunId: string, requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<void> {
    await this.fetchImpl(`/test-runs/${testRunId}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
  }
  /**
   * List existing test-runs for a pipeline.
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param requestInit The initializer for the request.
   */
  public async list(
    pipelineId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/test-runs`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing test-run by Pipeline
   *
   * @param pipelineId unique identifier of pipeline
   * @example "01234567-89ab-cdef-0123-456789abcdef".
   * @param testRunNumber the auto incrementing test run number.
   * @param requestInit The initializer for the request.
   */
  public async infoByPipeline(
    pipelineId: string,
    testRunNumber: number,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/pipelines/${pipelineId}/test-runs/${testRunNumber}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
  }
  /**
   * Update a test-run's status.
   *
   * @param testRunNumber the auto incrementing test run number.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    testRunNumber: number,
    payload: Heroku.TestRunUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/test-runs/${testRunNumber}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
  }
}
