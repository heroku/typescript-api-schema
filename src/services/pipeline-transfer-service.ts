import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Pipeline Transfer](https://devcenter.heroku.com/articles/platform-api-reference#pipeline-transfer)
 * A pipeline transfer is the process of changing pipeline ownership along with the contained apps.
 */
export default class PipelineTransferService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new pipeline transfer.
   *
   * @param body Object to send to the endpoint.
   */
  public async create(body: Heroku.PipelineTransferCreatePayload): Promise<Heroku.PipelineTransfer> {
    const response = await this.heroku.post<Heroku.PipelineTransfer>(`/pipeline-transfers`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
