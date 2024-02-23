import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Member](https://devcenter.heroku.com/articles/platform-api-reference#team-member)
 * A team member is an individual with access to a team.
 */
export default class TeamMemberService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new team member, or update their role.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    createOrUpdate(teamIdentity: string, payload: Heroku.TeamMemberCreateOrUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamMember>;
    /**
     * Create a new team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(teamIdentity: string, payload: Heroku.TeamMemberCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamMember>;
    /**
     * Update a team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(teamIdentity: string, payload: Heroku.TeamMemberUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamMember>;
    /**
     * Remove a member from the team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
     * @param requestInit The initializer for the request.
     */
    delete(teamIdentity: string, teamMemberIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamMember>;
    /**
     * List members of the team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    list(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamMember[]>;
    /**
     * List the apps of a team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
     * @param requestInit The initializer for the request.
     */
    listByMember(teamIdentity: string, teamMemberIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp[]>;
}
