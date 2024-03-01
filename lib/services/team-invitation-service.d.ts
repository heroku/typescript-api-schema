import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Invitation](https://devcenter.heroku.com/articles/platform-api-reference#team-invitation)
* A team invitation represents an invite to a team.
*/
export default class TeamInvitationService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Get a list of a team's Identity Providers
 *
 * @param teamName unique name of team
 * @example example.
 */
    list(teamName: string): Promise<Heroku.TeamInvitation[]>;
    /**
     * Create Team Invitation
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    create(teamIdentity: string, body: Heroku.TeamInvitationCreatePayload): Promise<Heroku.TeamInvitation>;
    /**
     * Revoke a team invitation.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamInvitationIdentity unique identifier of an invitation.
     */
    revoke(teamIdentity: string, teamInvitationIdentity: string): Promise<Heroku.TeamInvitation>;
    /**
     * Get an invitation by its token
     *
     * @param teamInvitationToken special token for invitation
     * @example 614ae25aa2d4802096cd7c18625b526c.
     */
    get(teamInvitationToken: string): Promise<Heroku.TeamInvitation>;
    /**
     * Accept Team Invitation
     *
     * @param teamInvitationToken special token for invitation
     * @example 614ae25aa2d4802096cd7c18625b526c.
     */
    accept(teamInvitationToken: string): Promise<Heroku.TeamMember>;
}
