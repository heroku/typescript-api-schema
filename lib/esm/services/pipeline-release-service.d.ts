import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Release](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-release)
 * Information about the latest release of each app in a pipeline. A release makes a deployment available to end-users.
 */
export default class PipelineReleaseService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List latest releases for each app in a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    list(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Release[]>;
}
