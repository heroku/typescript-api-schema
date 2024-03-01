import type { APIClient } from '@heroku-cli/command';
/**
 * [Test Case](https://devcenter.heroku.com/articles/platform-api-reference#test-case)
 * A single test case belonging to a test run
 */
export default class TestCaseService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List test cases
   *
   * @param testRunId unique identifier of a test run.
   */
  public async list(testRunId: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.get<Record<string, unknown>>(`/test-runs/${testRunId}/test-cases`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
