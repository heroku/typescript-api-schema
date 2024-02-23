/**
 * [Test Node](https://devcenter.heroku.com/articles/platform-api-reference#test-node)
 * A single test node belonging to a test run
 */
export default class TestNodeService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List test nodes
     *
     * @param testRunIdentity unique identifier of a test run.
     * @param requestInit The initializer for the request.
     */
    list(testRunIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
}
