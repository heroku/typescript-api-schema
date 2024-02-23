import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Transfer](https://devcenter.heroku.com/articles/platform-api-reference#space-transfer)
 * Transfer spaces between enterprise teams with the same Enterprise Account.
 */
export default class SpaceTransferService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Transfer space between enterprise teams
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    transfer(spaceIdentity: string, payload: Heroku.SpaceTransferTransferPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space>;
}
