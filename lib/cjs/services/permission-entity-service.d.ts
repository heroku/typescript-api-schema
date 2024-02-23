import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Permission Entity](https://devcenter.heroku.com/articles/platform-api-reference#permission-entity)
 * An owned entity including users' permissions.
 */
export default class PermissionEntityService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List permission entities for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.PermissionEntity[]>;
}
