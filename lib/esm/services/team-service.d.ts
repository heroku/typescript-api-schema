import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team](https://devcenter.heroku.com/articles/platform-api-reference#team)
 * Teams allow you to manage access to a shared group of applications and other resources.
 */
export default class TeamService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List teams in which you are a member.
     *
     * @param requestInit The initializer for the request.
     */
    list(requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team[]>;
    /**
     * Info for a team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    info(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team>;
    /**
     * Update team properties.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(teamIdentity: string, payload: Heroku.TeamUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team>;
    /**
     * Create a new team.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.TeamCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team>;
    /**
     * Delete an existing team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    delete(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team>;
    /**
     * List teams for an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param requestInit The initializer for the request.
     */
    listByEnterpriseAccount(enterpriseAccountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team[]>;
    /**
     * Create a team in an enterprise account.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    createInEnterpriseAccount(enterpriseAccountIdentity: string, payload: Heroku.TeamCreateInEnterpriseAccountPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Team>;
}
