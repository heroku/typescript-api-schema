/**
 Heroku Platform API - Domain
Domains define what web routes should be routed to an app on Heroku.

*/
export default class DomainService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new domain.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/domains`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Associate an SNI endpoint
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, domainIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/domains/${domainIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete an existing domain
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     */
    async delete(appIdentity, domainIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/domains/${domainIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing domain.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param domainIdentity unique identifier of this domain or full hostname.
     */
    async info(appIdentity, domainIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/domains/${domainIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing domains.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/domains`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
