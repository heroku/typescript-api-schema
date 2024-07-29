"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Team App](https://devcenter.heroku.com/articles/platform-api-reference#team-app)
 * A team app encapsulates the team specific functionality of Heroku apps.
 */
class TeamAppService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(payload, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/apps`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Info for a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    async info(teamAppIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/apps/${teamAppIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Lock or unlock a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async updateLocked(teamAppIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/apps/${teamAppIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Transfer an existing team app to another Heroku account.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async transferToAccount(teamAppIdentity, payload, requestInit = {}) {
        await this.fetchImpl(`/teams/apps/${teamAppIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
    }
    /**
     * Transfer an existing team app to another team.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async transferToTeam(teamAppIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/apps/${teamAppIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * List team apps.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async listByTeam(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/apps`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
exports.default = TeamAppService;