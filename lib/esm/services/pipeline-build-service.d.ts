import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Build](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-build)
 * Information about latest builds of apps in a pipeline.
 */
export default class PipelineBuildService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List latest builds for each app in a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    list(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Build[]>;
}
