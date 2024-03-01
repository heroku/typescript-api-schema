import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Stack](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-stack)
* A pipeline's stack is determined by the apps in the pipeline. This is used during creation of CI and Review Apps that have no stack defined in app.json
*/
export default class PipelineStackService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * The stack for a given pipeline, used for CI and Review Apps that have no stack defined in app.json.
 *
 * @param pipelineId unique identifier of pipeline
 * @example 01234567-89ab-cdef-0123-456789abcdef.
 */
    defaultStack(pipelineId: string): Promise<Heroku.PipelineStack>;
}
