import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Add-on](https://devcenter.heroku.com/articles/platform-api-reference#team-add-on)
 *
 */
export default class TeamAddOnService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List add-ons used across all Team apps
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    listForTeam(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AddOn[]>;
}
