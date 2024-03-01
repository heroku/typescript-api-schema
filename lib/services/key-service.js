/**
 Heroku Platform API - Key
Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.

*/
export default class KeyService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Info for existing key.
 *
 * @param keyIdentity unique identifier of this key or a unique identifying string based on contents.
 */
    async info(keyIdentity) {
        const response = await this.heroku.get(`/account/keys/${keyIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing keys.
     *
     */
    async list() {
        const response = await this.heroku.get(`/account/keys`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
