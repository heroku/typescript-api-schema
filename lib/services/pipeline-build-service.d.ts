import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Build](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-build)
* Information about latest builds of apps in a pipeline.
*/
export default class PipelineBuildService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List latest builds for each app in a pipeline
 *
 * @param pipelineId unique identifier of pipeline
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 */
    list(pipelineId: string): Promise<Heroku.Build[]>;
}
