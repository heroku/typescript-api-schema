/**
 * [Test Case](https://devcenter.heroku.com/articles/platform-api-reference#test-case)
 * A single test case belonging to a test run
 */
export default class TestCaseService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List test cases
   *
   * @param testRunId unique identifier of a test run.
   * @param requestInit The initializer for the request.
   */
  public async list(
    testRunId: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/test-runs/${testRunId}/test-cases`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
