import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Stack](https://devcenter.heroku.com/articles/platform-api-reference#stack)
 * Stacks are the different application execution environments available in the Heroku platform.
 */
export default class StackService {
    protected readonly fetchImpl: typeof fetch;
    constructor(fetchImpl: typeof fetch);
    /**
     * Stack info.
     *
     * @param stackIdentity unique name of stack or unique identifier of stack.
     * @param requestInit The initializer for the request.
     */
    info(stackIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Stack>;
    /**
     * List available stacks.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Stack[]>;
}
