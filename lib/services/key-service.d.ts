import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Key](https://devcenter.heroku.com/articles/platform-api-reference#key)
* Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
*/
export default class KeyService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Info for existing key.
 *
 * @param keyIdentity unique identifier of this key or a unique identifying string based on contents.
 */
    info(keyIdentity: string): Promise<Heroku.Key>;
    /**
     * List existing keys.
     *
     */
    list(): Promise<Heroku.Key[]>;
}
