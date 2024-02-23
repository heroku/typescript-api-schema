"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Test Case](https://devcenter.heroku.com/articles/platform-api-reference#test-case)
 * A single test case belonging to a test run
 */
class TestCaseService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * List test cases
     *
     * @param testRunId unique identifier of a test run.
     * @param requestInit The initializer for the request.
     */
    async list(testRunId, requestInit = {}) {
        const response = await this.fetchImpl(`/test-runs/${testRunId}/test-cases`, {
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
exports.default = TestCaseService;
