import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Space](https://devcenter.heroku.com/articles/platform-api-reference#team-space)
 * A space is an isolated, highly available, secure app execution environment.
 */
export default class TeamSpaceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List spaces owned by the team
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Space[]>;
}
