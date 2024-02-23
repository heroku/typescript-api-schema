/**
 Test Case
A single test case belonging to a test run

*/
export default class TestCaseService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List test cases
 *
 * @param testRunId unique identifier of a test run.
 */
    async list(testRunId) {
        const response = await this.heroku.get(`/test-runs/${testRunId}/test-cases`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
