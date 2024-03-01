/**
 Heroku Platform API - Pipeline Transfer
A pipeline transfer is the process of changing pipeline ownership along with the contained apps.

*/
export default class PipelineTransferService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new pipeline transfer.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/pipeline-transfers`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
