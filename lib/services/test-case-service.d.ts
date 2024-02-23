import type { APIClient } from '@heroku-cli/command';
/**
 * [Test Case](https://devcenter.heroku.com/articles/platform-api-reference#test-case)
* A single test case belonging to a test run
*/
export default class TestCaseService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List test cases
 *
 * @param testRunId unique identifier of a test run.
 */
    list(testRunId: string): Promise<Record<string, unknown>>;
}
