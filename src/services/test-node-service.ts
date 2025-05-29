/**
 * [Test Node](https://devcenter.heroku.com/articles/platform-api-reference#test-node)
 * A single test node belonging to a test run
 */
export default class TestNodeService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List test nodes
   *
   * @param testRunIdentity unique identifier of a test run.
   * @param requestInit The initializer for the request.
   */
  public async list(
    testRunIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`${this.endpoint}/test-runs/${testRunIdentity}/test-nodes`, {
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
