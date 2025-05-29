/**
 * [Heroku Platform API - Usage](https://devcenter.heroku.com/articles/platform-api-reference#usage)
 * Usage for apps.
 */
export default class UsageService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Retrieves usage for an app.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    async info(appIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/usage`, {
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
     * Retrieves usage for an app belonging to a particular team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    async infoUsage(teamIdentity, teamAppIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/apps/${teamAppIdentity}/usage`, {
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
     * Retrieves usage for apps belonging to a particular team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async infoApps(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/usage`, {
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
}
