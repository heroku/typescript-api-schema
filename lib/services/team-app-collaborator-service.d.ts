import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#team-app-collaborator)
* A team collaborator represents an account that has been given access to a team app on Heroku.
*/
export default class TeamAppCollaboratorService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.TeamAppCollaboratorCreatePayload): Promise<Heroku.TeamAppCollaborator>;
    /**
     * Delete an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     */
    delete(teamAppIdentity: string, teamAppCollaboratorIdentity: string): Promise<Heroku.TeamAppCollaborator>;
    /**
     * Info for a collaborator on a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     */
    info(teamAppIdentity: string, teamAppCollaboratorIdentity: string): Promise<Heroku.TeamAppCollaborator>;
    /**
     * Update an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app.
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param body Object to send to the endpoint.
     */
    update(teamAppIdentity: string, teamAppCollaboratorIdentity: string, body: Heroku.TeamAppCollaboratorUpdatePayload): Promise<Heroku.TeamAppCollaborator>;
    /**
     * List collaborators on a team app.
     *
     * @param teamAppIdentity unique name of app.
     */
    list(teamAppIdentity: string): Promise<Heroku.TeamAppCollaborator[]>;
}
