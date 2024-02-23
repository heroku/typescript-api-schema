import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering](https://devcenter.heroku.com/articles/platform-api-reference#peering)
* [Peering](https://devcenter.heroku.com/articles/private-space-peering) provides a way to peer your Private Space VPC to another AWS VPC.
*/
export default class PeeringService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * List peering connections of a private space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    list(spaceIdentity: string): Promise<Heroku.Peering[]>;
    /**
     * Accept a pending peering connection with a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
     * @example pcx-123456789012.
     */
    accept(spaceIdentity: string, peeringPcxId: string): Promise<Heroku.Peering>;
    /**
     * Destroy an active peering connection with a private space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
     * @example pcx-123456789012.
     */
    destroy(spaceIdentity: string, peeringPcxId: string): Promise<Heroku.Peering>;
    /**
     * Fetch information for existing peering connection
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
     * @example pcx-123456789012.
     */
    info(spaceIdentity: string, peeringPcxId: string): Promise<Heroku.Peering>;
}
