import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Transfer](https://devcenter.heroku.com/articles/platform-api-reference#space-transfer)
* Transfer spaces between enterprise teams with the same Enterprise Account.
*/
export default class SpaceTransferService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Transfer space between enterprise teams
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 * @param body Object to send to the endpoint.
 */
    transfer(spaceIdentity: string, body: Heroku.SpaceTransferTransferPayload): Promise<Heroku.Space>;
}
