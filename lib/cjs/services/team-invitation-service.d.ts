import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invitation](https://devcenter.heroku.com/articles/platform-api-reference#team-invitation)
 * A team invitation represents an invite to a team.
 */
export default class TeamInvitationService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Get a list of a team's Identity Providers
     *
     * @param teamName unique name of team
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    list(teamName: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamInvitation[]>;
    /**
     * Create Team Invitation
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(teamIdentity: string, payload: Heroku.TeamInvitationCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamInvitation>;
    /**
     * Revoke a team invitation.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamInvitationIdentity unique identifier of an invitation.
     * @param requestInit The initializer for the request.
     */
    revoke(teamIdentity: string, teamInvitationIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamInvitation>;
    /**
     * Get an invitation by its token
     *
     * @param teamInvitationToken special token for invitation
     * @example "614ae25aa2d4802096cd7c18625b526c".
     * @param requestInit The initializer for the request.
     */
    get(teamInvitationToken: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamInvitation>;
    /**
     * Accept Team Invitation
     *
     * @param teamInvitationToken special token for invitation
     * @example "614ae25aa2d4802096cd7c18625b526c".
     * @param requestInit The initializer for the request.
     */
    accept(teamInvitationToken: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamMember>;
}
