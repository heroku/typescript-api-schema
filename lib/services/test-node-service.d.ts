import type { APIClient } from '@heroku-cli/command';
/**
 * [Test Node](https://devcenter.heroku.com/articles/platform-api-reference#test-node)
* A single test node belonging to a test run
*/
export default class TestNodeService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List test nodes
 *
 * @param testRunIdentity unique identifier of a test run.
 */
    list(testRunIdentity: string): Promise<Record<string, unknown>>;
}
