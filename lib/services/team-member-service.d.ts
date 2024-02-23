import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team Member](https://devcenter.heroku.com/articles/platform-api-reference#team-member)
* A team member is an individual with access to a team.
*/
export default class TeamMemberService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new team member, or update their role.
 *
 * @param teamIdentity unique name of team or unique identifier of team.
 * @param body Object to send to the endpoint.
 */
    createOrUpdate(teamIdentity: string, body: Heroku.TeamMemberCreateOrUpdatePayload): Promise<Heroku.TeamMember>;
    /**
     * Create a new team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    create(teamIdentity: string, body: Heroku.TeamMemberCreatePayload): Promise<Heroku.TeamMember>;
    /**
     * Update a team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param body Object to send to the endpoint.
     */
    update(teamIdentity: string, body: Heroku.TeamMemberUpdatePayload): Promise<Heroku.TeamMember>;
    /**
     * Remove a member from the team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
     */
    delete(teamIdentity: string, teamMemberIdentity: string): Promise<Heroku.TeamMember>;
    /**
     * List members of the team.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     */
    list(teamIdentity: string): Promise<Heroku.TeamMember[]>;
    /**
     * List the apps of a team member.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param teamMemberIdentity email address of the team member or unique identifier of the team member.
     */
    listByMember(teamIdentity: string, teamMemberIdentity: string): Promise<Heroku.TeamApp[]>;
}
