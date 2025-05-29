/**
 * [Heroku Platform API - Pipeline Release](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-release)
 * Information about the latest release of each app in a pipeline. A release makes a deployment available to end-users.
 */
export default class PipelineReleaseService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List latest releases for each app in a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    async list(pipelineId, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/pipelines/${pipelineId}/latest-releases`, {
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
