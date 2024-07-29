"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Permission Entity](https://devcenter.heroku.com/articles/platform-api-reference#permission-entity)
 * An owned entity including users' permissions.
 */
class PermissionEntityService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * List permission entities for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async list(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/permissions`, {
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
exports.default = PermissionEntityService;