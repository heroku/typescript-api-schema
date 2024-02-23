/**
 Test Node
A single test node belonging to a test run

*/
export default class TestNodeService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List test nodes
 *
 * @param testRunIdentity unique identifier of a test run.
 */
    async list(testRunIdentity) {
        const response = await this.heroku.get(`/test-runs/${testRunIdentity}/test-nodes`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
