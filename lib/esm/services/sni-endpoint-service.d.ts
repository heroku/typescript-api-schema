import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SNI Endpoint](https://devcenter.heroku.com/articles/platform-api-reference#sni-endpoint)
 * SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
 */
export default class SniEndpointService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.SniEndpointCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SniEndpoint>;
    /**
     * Delete existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, sniEndpointIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SniEndpoint>;
    /**
     * Info for existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, sniEndpointIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SniEndpoint>;
    /**
     * List existing SNI endpoints.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SniEndpoint[]>;
    /**
     * Update an existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, sniEndpointIdentity: string, payload: Heroku.SniEndpointUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SniEndpoint>;
}
