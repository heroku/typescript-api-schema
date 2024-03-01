/**
 Heroku Platform API - Stack
Stacks are the different application execution environments available in the Heroku platform.

*/
export default class StackService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Stack info.
 *
 * @param stackIdentity unique name of stack or unique identifier of stack.
 */
    async info(stackIdentity) {
        const response = await this.heroku.get(`/stacks/${stackIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List available stacks.
     *
     */
    async list() {
        const response = await this.heroku.get(`/stacks`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
