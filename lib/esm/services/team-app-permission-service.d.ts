import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Permission](https://devcenter.heroku.com/articles/platform-api-reference#team-app-permission)
 * A team app permission is a behavior that is assigned to a user in a team app.
 */
export default class TeamAppPermissionService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Lists permissions available to teams.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamAppPermission[]>;
}
