import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Deployment](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-deployment)
 * Information about latest deployments of apps in a pipeline.
 */
export default class PipelineDeploymentService {
    protected readonly fetchImpl: typeof fetch;
    constructor(fetchImpl: typeof fetch);
    /**
     * List latest slug releases for each app in a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    list(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Release[]>;
}
