import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Test Run](https://devcenter.heroku.com/articles/platform-api-reference#test-run)
* An execution or trial of one or more tests
*/
export default class TestRunService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new test-run.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.TestRunCreatePayload): Promise<void>;
    /**
     * Info for existing test-run.
     *
     * @param testRunId unique identifier of a test run.
     */
    info(testRunId: string): Promise<void>;
    /**
     * List existing test-runs for a pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     */
    list(pipelineId: string): Promise<Record<string, unknown>>;
    /**
     * Info for existing test-run by Pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     * @param testRunNumber the auto incrementing test run number.
     */
    infoByPipeline(pipelineId: string, testRunNumber: number): Promise<void>;
    /**
     * Update a test-run's status.
     *
     * @param testRunNumber the auto incrementing test run number.
     * @param body Object to send to the endpoint.
     */
    update(testRunNumber: number, body: Heroku.TestRunUpdatePayload): Promise<void>;
}
