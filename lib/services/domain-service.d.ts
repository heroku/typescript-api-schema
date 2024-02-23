import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Domain](https://devcenter.heroku.com/articles/platform-api-reference#domain)
* Domains define what web routes should be routed to an app on Heroku.
*/
export default class DomainService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new domain.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.DomainCreatePayload): Promise<Heroku.Domain>;
    /**
     * Associate an SNI endpoint
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     * @param body Object to send to the endpoint.
     */
    update(appIdentity: string, domainIdentity: string, body: Heroku.DomainUpdatePayload): Promise<Heroku.Domain>;
    /**
     * Delete an existing domain
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     */
    delete(appIdentity: string, domainIdentity: string): Promise<Heroku.Domain>;
    /**
     * Info for existing domain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     */
    info(appIdentity: string, domainIdentity: string): Promise<Heroku.Domain>;
    /**
     * List existing domains.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.Domain[]>;
}
