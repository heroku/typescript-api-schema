import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Credit](https://devcenter.heroku.com/articles/platform-api-reference#credit)
* A credit represents value that will be used up before further charges are assigned to an account.
*/
export default class CreditService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new credit.
 *
 * @param body Object to send to the endpoint.
 */
    create(body: Heroku.CreditCreatePayload): Promise<Heroku.Credit>;
    /**
     * Info for existing credit.
     *
     * @param creditIdentity unique identifier of credit.
     */
    info(creditIdentity: string): Promise<Heroku.Credit>;
    /**
     * List existing credits.
     *
     */
    list(): Promise<Heroku.Credit[]>;
}
