import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Host](https://devcenter.heroku.com/articles/platform-api-reference#space-host)
 * [Space Hosts](https://devcenter.heroku.com/articles/private-spaces-dedicated-hosts?preview=1) lists dedicated hosts allocated to a space
 */
export default class SpaceHostService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List hosts
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    list(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SpaceHost[]>;
}
