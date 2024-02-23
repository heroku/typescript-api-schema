import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Network Address Translation](https://devcenter.heroku.com/articles/platform-api-reference#space-nat)
 * Network address translation (NAT) for stable outbound IP addresses from a space
 */
export default class SpaceNatService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Current state of network address translation for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SpaceNat>;
}
