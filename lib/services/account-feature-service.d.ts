import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account Feature](https://devcenter.heroku.com/articles/platform-api-reference#account-feature)
* An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
*/
export default class AccountFeatureService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for an existing account feature.
 *
 * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
 */
    info(accountFeatureIdentity: string): Promise<Heroku.AccountFeature>;
    /**
     * List existing account features.
     *
     */
    list(): Promise<Heroku.AccountFeature[]>;
    /**
     * Update an existing account feature.
     *
     * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
     * @param body Object to send to the endpoint.
     */
    update(accountFeatureIdentity: string, body: Heroku.AccountFeatureUpdatePayload): Promise<Heroku.AccountFeature>;
}
