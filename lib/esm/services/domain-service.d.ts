import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Domain](https://devcenter.heroku.com/articles/platform-api-reference#domain)
 * Domains define what web routes should be routed to an app on Heroku.
 */
export default class DomainService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new domain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.DomainCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Domain>;
    /**
     * Associate an SNI endpoint
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(appIdentity: string, domainIdentity: string, payload: Heroku.DomainUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Domain>;
    /**
     * Delete an existing domain
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, domainIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Domain>;
    /**
     * Info for existing domain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, domainIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Domain>;
    /**
     * List existing domains.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Domain[]>;
}
