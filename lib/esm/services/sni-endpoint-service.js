/**
 * [Heroku Platform API - SNI Endpoint](https://devcenter.heroku.com/articles/platform-api-reference#sni-endpoint)
 * SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
 */
export default class SniEndpointService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(appIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Delete existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param requestInit The initializer for the request.
     */
    async delete(appIdentity, sniEndpointIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
            ...requestInit,
            method: 'DELETE',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Info for existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param requestInit The initializer for the request.
     */
    async info(appIdentity, sniEndpointIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * List existing SNI endpoints.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async list(appIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Update an existing SNI endpoint.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(appIdentity, sniEndpointIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
