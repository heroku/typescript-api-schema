"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Pipeline Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-config-var)
 * Pipeline config vars in Heroku CI and review apps used to manage the configuration information for a pipeline.
 */
class PipelineConfigVarService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Get config-vars for a pipeline stage.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param pipelineCouplingStage target pipeline stage
     * @example "production".
     * @param requestInit The initializer for the request.
     */
    async infoForApp(pipelineId, pipelineCouplingStage, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/stage/${pipelineCouplingStage}/config-vars`, {
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
    /**
     * Update config-vars for a pipeline stage. You can update existing config-vars by setting them again, and remove by setting it to `null`.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param pipelineCouplingStage target pipeline stage
     * @example "production".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(pipelineId, pipelineCouplingStage, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/stage/${pipelineCouplingStage}/config-vars`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
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
exports.default = PipelineConfigVarService;
