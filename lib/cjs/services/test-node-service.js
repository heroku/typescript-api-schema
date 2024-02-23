"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Test Node](https://devcenter.heroku.com/articles/platform-api-reference#test-node)
 * A single test node belonging to a test run
 */
class TestNodeService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List test nodes
     *
     * @param testRunIdentity unique identifier of a test run.
     * @param requestInit The initializer for the request.
     */
    async list(testRunIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/test-runs/${testRunIdentity}/test-nodes`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
exports.default = TestNodeService;
