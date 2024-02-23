import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering Info](https://devcenter.heroku.com/articles/platform-api-reference#peering-info)
 * [Peering Info](https://devcenter.heroku.com/articles/private-space-peering) gives you the information necessary to peer an AWS VPC to a Private Space.
 */
export default class PeeringInfoService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Provides the necessary information to establish an AWS VPC Peering with your private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PeeringInfo>;
}
