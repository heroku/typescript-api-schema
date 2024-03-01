import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline](https://devcenter.heroku.com/articles/platform-api-reference#pipeline)
* A pipeline allows grouping of apps into different stages.
*/
export default class PipelineService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new pipeline.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.PipelineCreatePayload): Promise<Heroku.Pipeline>;
    /**
     * Info for existing pipeline.
     *
     * @param pipelineIdentity unique identifier of pipeline or name of pipeline.
     */
    info(pipelineIdentity: string): Promise<Heroku.Pipeline>;
    /**
     * Delete an existing pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     */
    delete(pipelineId: string): Promise<Heroku.Pipeline>;
    /**
     * Update an existing pipeline.
     *
     * @param pipelineId unique identifier of pipeline
     * @example 01234567-89ab-cdef-0123-456789abcdef.
     * @param body Object to send to the endpoint.
     */
    update(pipelineId: string, body: Heroku.PipelineUpdatePayload): Promise<Heroku.Pipeline>;
    /**
     * List existing pipelines.
     *
     */
    list(): Promise<Heroku.Pipeline[]>;
}
