import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#collaborator)
* A collaborator represents an account that has been given access to an app on Heroku.
*/
export default class CollaboratorService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Create a new collaborator.
 *
 * @param appIdentity unique identifier of app or unique name of app.
 * @param body Object to send to the endpoint.
 */
    create(appIdentity: string, body: Heroku.CollaboratorCreatePayload): Promise<Heroku.Collaborator>;
    /**
     * Delete an existing collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
     */
    delete(appIdentity: string, collaboratorIdentity: string): Promise<Heroku.Collaborator>;
    /**
     * Info for existing collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
     */
    info(appIdentity: string, collaboratorIdentity: string): Promise<Heroku.Collaborator>;
    /**
     * List existing collaborators.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     */
    list(appIdentity: string): Promise<Heroku.Collaborator[]>;
}
