/**
 * [Heroku Platform API - Team Feature](https://devcenter.heroku.com/articles/platform-api-reference#team-feature)
 * A team feature represents a feature enabled on a team account.
 */
export default class TeamFeatureService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Info for an existing team feature.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamFeatureIdentity unique identifier of team feature or unique name of team feature.
     * @param requestInit The initializer for the request.
     */
    async info(teamIdentity, teamFeatureIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/features/${teamFeatureIdentity}`, {
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
     * List existing team features.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    async list(teamIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/teams/${teamIdentity}/features`, {
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