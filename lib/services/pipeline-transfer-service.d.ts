import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Transfer](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-transfer)
* A pipeline transfer is the process of changing pipeline ownership along with the contained apps.
*/
export default class PipelineTransferService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new pipeline transfer.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.PipelineTransferCreatePayload): Promise<Heroku.PipelineTransfer>;
}
