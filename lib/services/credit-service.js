/**
 Heroku Platform API - Credit
A credit represents value that will be used up before further charges are assigned to an account.

*/
export default class CreditService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new credit.
 *
 * @param body Object to send to the endpoint.
 */
    async create(body) {
        const response = await this.heroku.post(`/account/credits`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing credit.
     *
     * @param creditIdentity unique identifier of credit.
     */
    async info(creditIdentity) {
        const response = await this.heroku.get(`/account/credits/${creditIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing credits.
     *
     */
    async list() {
        const response = await this.heroku.get(`/account/credits`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
