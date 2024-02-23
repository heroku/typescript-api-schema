import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Stack](https://devcenter.heroku.com/articles/platform-api-reference#stack)
* Stacks are the different application execution environments available in the Heroku platform.
*/
export default class StackService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Stack info.
 *
 * @param stackIdentity unique name of stack or unique identifier of stack.
 */
    info(stackIdentity: string): Promise<Heroku.Stack>;
    /**
     * List available stacks.
     *
     */
    list(): Promise<Heroku.Stack[]>;
}
