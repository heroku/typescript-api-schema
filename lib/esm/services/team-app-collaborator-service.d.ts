import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#team-app-collaborator)
 * A team collaborator represents an account that has been given access to a team app on Heroku.
 */
export default class TeamAppCollaboratorService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.TeamAppCollaboratorCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamAppCollaborator>;
    /**
     * Delete an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param requestInit The initializer for the request.
     */
    delete(teamAppIdentity: string, teamAppCollaboratorIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamAppCollaborator>;
    /**
     * Info for a collaborator on a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param requestInit The initializer for the request.
     */
    info(teamAppIdentity: string, teamAppCollaboratorIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamAppCollaborator>;
    /**
     * Update an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(teamAppIdentity: string, teamAppCollaboratorIdentity: string, payload: Heroku.TeamAppCollaboratorUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamAppCollaborator>;
    /**
     * List collaborators on a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    list(teamAppIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamAppCollaborator[]>;
}
