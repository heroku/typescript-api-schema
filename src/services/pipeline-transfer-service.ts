import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Transfer](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-transfer)
 * A pipeline transfer is the process of changing pipeline ownership along with the contained apps.
 */
export default class PipelineTransferService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new pipeline transfer.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.PipelineTransferCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.PipelineTransfer> {
    const response = await this.fetchImpl(`${this.endpoint}/pipeline-transfers`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.PipelineTransfer>;
    }
    throw new Error(response.statusText);
  }
}
