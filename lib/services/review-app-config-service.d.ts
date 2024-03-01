import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Review App Configuration](https://devcenter.heroku.com/articles/platform-api-reference#review-app-config)
* Review apps can be configured for pipelines.
*/
export default class ReviewAppConfigService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Enable review apps for a pipeline
 *
 * @param pipelineId unique identifier of pipeline
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 * @param body Object to send to the endpoint.
 */
    enable(pipelineId: string, body: Heroku.ReviewAppConfigEnablePayload): Promise<Heroku.ReviewAppConfig>;
    /**
     * Get review apps configuration for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     */
    info(pipelineId: string): Promise<Heroku.ReviewAppConfig>;
    /**
     * Update review app configuration for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     * @param body Object to send to the endpoint.
     */
    update(pipelineId: string, body: Heroku.ReviewAppConfigUpdatePayload): Promise<Heroku.ReviewAppConfig>;
    /**
     * Disable review apps for a pipeline
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     */
    delete(pipelineId: string): Promise<Heroku.ReviewAppConfig>;
}
