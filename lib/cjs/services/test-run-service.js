"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Test Run](https://devcenter.heroku.com/articles/platform-api-reference#test-run)
 * An execution or trial of one or more tests
 */
class TestRunService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new test-run.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        await this.fetchImpl(`/test-runs`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
    }
    /**
     * Info for existing test-run.
     *
     * @param testRunId unique identifier of a test run.
     * @param requestInit The initializer for the request.
     */
    async info(testRunId, requestInit = {}) {
        await this.fetchImpl(`/test-runs/${testRunId}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
    }
    /**
     * List existing test-runs for a pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    async list(pipelineId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/test-runs`, {
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
    /**
     * Info for existing test-run by Pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param testRunNumber the auto incrementing test run number.
     * @param requestInit The initializer for the request.
     */
    async infoByPipeline(pipelineId, testRunNumber, requestInit = {}) {
        await this.fetchImpl(`/pipelines/${pipelineId}/test-runs/${testRunNumber}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
    }
    /**
     * Update a test-run's status.
     *
     * @param testRunNumber the auto incrementing test run number.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(testRunNumber, payload, requestInit = {}) {
        await this.fetchImpl(`/test-runs/${testRunNumber}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
    }
}
exports.default = TestRunService;
