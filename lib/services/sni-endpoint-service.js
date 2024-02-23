/**
 Heroku Platform API - SNI Endpoint
SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.

*/
export default class SniEndpointService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Create a new SNI endpoint.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    async create(appIdentity, body) {
        const response = await this.heroku.post(`/apps/${appIdentity}/sni-endpoints`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Delete existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     */
    async delete(appIdentity, sniEndpointIdentity) {
        const response = await this.heroku.delete(`/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * Info for existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     */
    async info(appIdentity, sniEndpointIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing SNI endpoints.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    async list(appIdentity) {
        const response = await this.heroku.get(`/apps/${appIdentity}/sni-endpoints`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param body Object to send to the endpoint.
     */
    async update(appIdentity, sniEndpointIdentity, body) {
        const response = await this.heroku.patch(`/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
