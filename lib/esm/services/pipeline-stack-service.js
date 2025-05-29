/**
 * [Heroku Platform API - Pipeline Stack](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-stack)
 * A pipeline's stack is determined by the apps in the pipeline. This is used during creation of CI and Review Apps that have no stack defined in app.json
 */
export default class PipelineStackService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * The stack for a given pipeline, used for CI and Review Apps that have no stack defined in app.json.
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    async defaultStack(pipelineId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/pipeline-stack`, {
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
