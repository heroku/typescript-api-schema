"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Team License Collection](https://devcenter.heroku.com/articles/platform-api-reference#team-license-collection)
 * A team license collection is credits provided and consumed by the team per period.
 */
class TeamLicenseCollectionService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * List team licenses.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async list(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/${teamIdentity}/license-collections`, {
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
exports.default = TeamLicenseCollectionService;
