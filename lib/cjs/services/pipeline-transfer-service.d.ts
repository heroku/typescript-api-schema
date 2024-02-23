import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Transfer](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-transfer)
 * A pipeline transfer is the process of changing pipeline ownership along with the contained apps.
 */
export default class PipelineTransferService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new pipeline transfer.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.PipelineTransferCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PipelineTransfer>;
}
