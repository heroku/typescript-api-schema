"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Allowed Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#allowed-add-on-service)
 * Entities that have been allowed to be used by a Team
 */
class AllowedAddOnServiceService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * List all allowed add-on services for a team
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async listByTeam(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/allowed-addon-services`, {
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
     * Allow an Add-on Service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async createByTeam(teamIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/allowed-addon-services`, {
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
     * Remove an allowed add-on service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param allowedAddOnServiceIdentity unique identifier for this allowed add-on service record or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    async deleteByTeam(teamIdentity, allowedAddOnServiceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/allowed-addon-services/${allowedAddOnServiceIdentity}`, {
            ...requestInit,
            method: 'DELETE',
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
}
exports.default = AllowedAddOnServiceService;