import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team License](https://devcenter.heroku.com/articles/platform-api-reference#team-license)
 * A team license is credits provided and consumed by the team.
 */
export default class TeamLicenseService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List teams licenses.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamLicense[]>;
}
