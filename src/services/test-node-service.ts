import type { APIClient } from '@heroku-cli/command';
/**
 * [Test Node](https://devcenter.heroku.com/articles/platform-api-reference#test-node)
 * A single test node belonging to a test run
 */
export default class TestNodeService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List test nodes
   *
   * @param testRunIdentity unique identifier of a test run.
   */
  public async list(testRunIdentity: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.get<Record<string, unknown>>(`/test-runs/${testRunIdentity}/test-nodes`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
