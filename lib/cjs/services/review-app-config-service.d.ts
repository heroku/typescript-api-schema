import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Review App Configuration](https://devcenter.heroku.com/articles/platform-api-reference#review-app-config)
 * Review apps can be configured for pipelines.
 */
export default class ReviewAppConfigService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Enable review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    enable(pipelineId: string, payload: Heroku.ReviewAppConfigEnablePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewAppConfig>;
    /**
     * Get review apps configuration for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    info(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewAppConfig>;
    /**
     * Update review app configuration for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(pipelineId: string, payload: Heroku.ReviewAppConfigUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewAppConfig>;
    /**
     * Disable review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example "01234567-89ab-cdef-0123-456789abcdef".
     * @param requestInit The initializer for the request.
     */
    delete(pipelineId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.ReviewAppConfig>;
}
