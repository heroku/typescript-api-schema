/**
 * [Test Case](https://devcenter.heroku.com/articles/platform-api-reference#test-case)
 * A single test case belonging to a test run
 */
export default class TestCaseService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List test cases
     *
     * @param testRunId unique identifier of a test run.
     * @param requestInit The initializer for the request.
     */
    list(testRunId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
}
