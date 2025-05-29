"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Pipeline Deployment](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-deployment)
 * Information about the latest deployment of each app in a pipeline. A deployment is the process of moving the build artifacts to a target environment.
 */
class PipelineDeploymentService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List latest deployments for each app in a pipeline. A deployment is a release that changed your source slug, container image, or Heroku processes.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    async list(pipelineId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/latest-deployments`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = PipelineDeploymentService;
