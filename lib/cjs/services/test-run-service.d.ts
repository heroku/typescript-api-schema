import * as Heroku from '@heroku-cli/schema';
/**
 * [Test Run](https://devcenter.heroku.com/articles/platform-api-reference#test-run)
 * An execution or trial of one or more tests
 */
export default class TestRunService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new test-run.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.TestRunCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
    /**
     * Info for existing test-run.
     *
     * @param testRunId unique identifier of a test run.
     * @param requestInit The initializer for the request.
     */
    info(testRunId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
    /**
     * List existing test-runs for a pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    list(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Record<string, unknown>>;
    /**
     * Info for existing test-run by Pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param testRunNumber the auto incrementing test run number.
     * @param requestInit The initializer for the request.
     */
    infoByPipeline(pipelineId: string, testRunNumber: number, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
    /**
     * Update a test-run's status.
     *
     * @param testRunNumber the auto incrementing test run number.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(testRunNumber: number, payload: Heroku.TestRunUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
}
