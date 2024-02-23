import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Feature](https://devcenter.heroku.com/articles/platform-api-reference#team-feature)
 * A team feature represents a feature enabled on a team account.
 */
export default class TeamFeatureService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Info for an existing team feature.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamFeatureIdentity unique identifier of team feature or unique name of team feature.
     * @param requestInit The initializer for the request.
     */
    info(teamIdentity: string, teamFeatureIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamFeature>;
    /**
     * List existing team features.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamFeature[]>;
}
