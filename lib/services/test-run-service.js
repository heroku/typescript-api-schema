/**
 Test Run
An execution or trial of one or more tests

*/
export default class TestRunService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new test-run.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/test-runs`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing test-run.
     *
     * @param testRunId unique identifier of a test run.
     */
    async info(testRunId) {
        const response = await this.heroku.get(`/test-runs/${testRunId}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing test-runs for a pipeline.
     *
     * @param pipelineId unique identifier of pipeline.
     */
    async list(pipelineId) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/test-runs`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info for existing test-run by Pipeline
     *
     * @param pipelineId unique identifier of pipeline.
     * @param testRunNumber the auto incrementing test run number.
     */
    async infoByPipeline(pipelineId, testRunNumber) {
        const response = await this.heroku.get(`/pipelines/${pipelineId}/test-runs/${testRunNumber}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update a test-run's status.
     *
     * @param testRunNumber the auto incrementing test run number.
     * @param body Object to send to the endpoint.
     */
    async update(testRunNumber, body) {
        const response = await this.heroku.patch(`/test-runs/${testRunNumber}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
