/**
 * [Heroku Platform API - Team Add-on](https://devcenter.heroku.com/articles/platform-api-reference#team-add-on)
 *
 */
export default class TeamAddOnService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * List add-ons used across all Team apps
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async listForTeam(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/addons`, {
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