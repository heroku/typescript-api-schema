import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering](https://devcenter.heroku.com/articles/platform-api-reference#peering)
 * [Peering](https://devcenter.heroku.com/articles/private-space-vpc-peering?preview=1) provides a way to peer your Private Space VPC to another AWS VPC.
 */
export default class PeeringService {
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
    /**
     * List peering connections of a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    list(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Peering[]>;
    /**
     * Accept a pending peering connection with a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    accept(spaceIdentity: string, payload: Heroku.PeeringAcceptPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Peering>;
    /**
     * Destroy an active peering connection with a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
     * @example "pcx-123456789012".
     * @param requestInit The initializer for the request.
     */
    destroy(spaceIdentity: string, peeringPcxId: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Peering>;
}
