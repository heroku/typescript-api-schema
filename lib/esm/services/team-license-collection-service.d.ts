import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team License Collection](https://devcenter.heroku.com/articles/platform-api-reference#team-license-collection)
 * A team license collection is credits provided and consumed by the team per period.
 */
export default class TeamLicenseCollectionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List team licenses.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamLicenseCollection[]>;
}
