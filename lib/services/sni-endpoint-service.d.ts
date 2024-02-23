import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SNI Endpoint](https://devcenter.heroku.com/articles/platform-api-reference#sni-endpoint)
* SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
*/
export default class SniEndpointService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new SNI endpoint.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.SniEndpointCreatePayload): Promise<Heroku.SniEndpoint>;
    /**
     * Delete existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     */
    delete(appIdentity: string, sniEndpointIdentity: string): Promise<Heroku.SniEndpoint>;
    /**
     * Info for existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     */
    info(appIdentity: string, sniEndpointIdentity: string): Promise<Heroku.SniEndpoint>;
    /**
     * List existing SNI endpoints.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.SniEndpoint[]>;
    /**
     * Update an existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, sniEndpointIdentity: string, body: Heroku.SniEndpointUpdatePayload): Promise<Heroku.SniEndpoint>;
}
