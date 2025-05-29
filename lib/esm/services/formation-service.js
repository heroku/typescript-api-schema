/**
 * [Heroku Platform API - Formation](https://devcenter.heroku.com/articles/platform-api-reference#formation)
 * The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.
 */
export default class FormationService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Info for a process type
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param formationIdentity unique identifier of this process type or type of process to maintain.
     * @param requestInit The initializer for the request.
     */
    async info(appIdentity, formationIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/formation/${formationIdentity}`, {
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
     * List process type formation
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async list(appIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/formation`, {
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
     * Batch update process types
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async batchUpdate(appIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/formation`, {
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
    /**
     * Update process type
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param formationIdentity unique identifier of this process type or type of process to maintain.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(appIdentity, formationIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/formation/${formationIdentity}`, {
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
